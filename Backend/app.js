import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import bcrypt from 'bcryptjs';
import path from 'path';
import bodyParser from 'body-parser';
import moment from 'moment';
import cookieParser from 'cookie-parser';
import { auth } from 'express-openid-connect';
import helmet from 'helmet';
import dotenv from 'dotenv';
import DOMPurify from "isomorphic-dompurify";
import crypto from 'crypto';
import cors from 'cors';
import { Server as SocketIO } from 'socket.io';
import http from 'http';
const app = express();

const server = http.createServer(app);
const io = new SocketIO(server);
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

const redisClient = createClient();
await redisClient.connect();
const sessionConfig = session({
  store: new RedisStore({ client: redisClient }),
  secret:  process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, 
    //httpOnly: true,
    // secure: false,
    sameSite: "strict"
  },
})

app.use(sessionConfig);
io.engine.use(sessionConfig);

// hantering för att kunna referera till mina andra filer, ex html för login
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgPath = path.join(__dirname, 'img');

app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["self"],
      //imgSrc: ["'self'", imgPath],
      connectSrc: ["'self'", 'http://localhost:5005'], 
      scriptSrc: ["'self'", "'nonce-supersecret'"],
  },
}));


function generateCSRFToken(req, res, next) {
  if (req.session.csrfToken === req.body._csrf) {
    next();
  } else {
    res.send("Invalid CSRF-token");
  }
}


app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//GITHUB-INLOGGNING
app.get('/auth/github', (_req, res) => {
  const authUrl = `http://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  res.redirect(authUrl); // Omdirigera till GitHub-inloggning
});


app.get('/auth/github/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
      headers: {
        Accept: 'application/json',
      },
    });
    const jsonResponse = await response.json();
    req.session.access_token = jsonResponse.access_token;
    console.log('Access Token från GitHub:', req.session.access_token);
    console.log('loggat in från github')
    // Hämta och spara användarinformation
    const userInfo = await getUserInfoFromGitHub(req.session.access_token);
    req.session.user = userInfo;
    req.session.authenticated = true;
    const githubname = userInfo.login
    //req.session.username = userinfo.login
    //console.log(req.session.user.login);
    console.log(userInfo)
    res.redirect('/protected'); // Redirect till skyddade sidan efter inloggning
}catch (error) {
  console.error('Error during GitHub callback:', error);
  res.status(500).send('Internal Server Error');
}
});


const getUserInfoFromGitHub = async (access_token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
};

app.get("/user", async (req, res) => {
  if (!req.session.access_token) {
    res.status(403).send("Access Denied.");
  }
  res.send(await response.json());
});



//login rutter
app.get('/',  (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  // Skicka CSRF-token till HTML-sidan som en variabel
  res.sendFile(filePath);
});


app.get('/login', (req, res) => {

      const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath);
  res.redirect('/protected');
});


app.post('/login', async (req, res) => {
  const { username, password  } = req.body;
  const hashedPassword = await redisClient.get(`user:${username}`);
  const isAdmin = await redisClient.get(`admin:${username}`);
  const csrfToken = crypto.randomBytes(64).toString("hex"); //En lång random sträng.
  req.session.csrfToken = csrfToken; // Token knyts till den aktuella sessionen.


  if (hashedPassword !== null) {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      req.session.username = username;
      req.session.authenticated = true;
      req.session.isAdmin = isAdmin === 'true';

      // Hämta blogginlägg här innan rendering
      const blogPosts = await getAllBlogPosts();

      // Skicka användarinformation till alla anslutna klienter via Socket.IO
      res.redirect('/protected');
    } else {
      res.status(401).send('Ogiltiga inloggningsuppgifter');
    }
  } else {
    res.status(401).send('Ogiltiga inloggningsuppgifter');
  }
});



app.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/');
});



// registreringsrout
app.post('/register', generateCSRFToken, async (req, res) => {
  try {
    const { newUsername, newPassword } = req.body;
    // kollar om användarnamnet är upptaget
    const userExists = await redisClient.exists(`user:${newUsername}`);
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({ error: 'Användarnamnet är redan taget' });
    }
    //måste vara mer än 8 tecken
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Lösenordet måste innehålla minst 8 tecken' });
    }
    //måste innehålla ett specialtecken
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
    if (!passwordRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ error: 'Lösenordet måste innehålla minst en siffra och ett specialtecken' });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
// Sparar användaren i Redis
    await redisClient.set(`user:${newUsername}`, hashedPassword);
    req.session.authenticated = true;
    req.session.username = newUsername;
res.redirect('/protected');
  } catch (error) {
    console.error('Fel vid registrering:', error);
    res.status(500).json({ error: 'Ett internt fel inträffade' });
  }
});


const authenticate = async (req, res, next) => {
try {
    if (req.session && req.session.authenticated) {
      const isAdminKey = `admin:${req.session.username}`;
      const isAdmin = await redisClient.get(isAdminKey);

      req.session.isAdmin = isAdmin === 'true';
      return next();
    } else {
      return res.status(401).send('Du måste logga in för att komma åt denna sidan');
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
};




app.get('/protected', authenticate,  async (req, res) => {
  try {
    const userInfo = await getUserInfoFromGitHub(req.session.access_token);
    req.session.user = userInfo;
    req.session.authenticated = true;
    const githubname = userInfo.login

    const blogPosts = await getAllBlogPosts();
    blogPosts.forEach(async (post) => {
      const likesCount = await redisClient.hGet(`blogpost:${post.postId}`, 'likes');
      post.likesCount = likesCount || 0;
      post.content = DOMPurify.sanitize(post.content);
  });
  res.render('protected', { username: req.session.username, blogPosts, isAdmin: req.session.isAdmin, github: githubname, csrfToken: req.session.csrfToken,  });

} catch (error) {
    console.error('Error retrieving blog posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

const postId = await redisClient.incr('nextPostId');
let blogPosts = [];


//hämta blogginläggen
app.get('/protected/post/:postId',  authenticate,  async (req, res) => {
  const postId = req.params.postId;
  const blogPosts = await getAllBlogPosts();

  // Hämta blogginlägget från Redis
  const blogPostData = await redisClient.hGet(`blogpost:${postId}`, 'content', 'username', 'createdAt', 'likesCount');

  if (!blogPostData) {
    // Om inget inlägg hittades, skicka 404
    res.status(404).send('Blog post not found');
    return;
  } 
  const comments = await getCommentsForPost(postId);
  res.render('post', {
    blogPost: {
      id: postId,
      content: blogPostData.content,
      username: blogPostData.username,
      createdAt: blogPostData.createdAt,
      likesCount: blogPostData.likesCount,
    },
    comments: comments,
  });
});

//rout för att skapa ett inlägg
app.post('/protected/create-post', generateCSRFToken, authenticate,   async (req, res) => {
  try {
    const { title, content  } = req.body;
    if (!title || !content){
      res.status(400).send("Bad request")
    }
    const username = req.session.username;
    const isAdmin = await redisClient.get(`admin:${username}`);
    const postId = await redisClient.incr('nextPostId');
    const date = new Date();
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
  
    const blogpostData = {
      id: postId,
      title,
      content,
      username,
       createdAt: formattedDate,
    };
   
await redisClient.hSet(`blogpost:${postId}`, blogpostData);
// Uppdatera blogPosts efter att användaren skapat, så den uppdateras
    const blogPosts = await getAllBlogPosts();
    

    res.redirect("/protected");
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).send('Internal Server Error');
  }
});




//kommentar
app.post('/protected/post/:postId/comment', authenticate, generateCSRFToken, async (req, res) => {
  const postId = req.params.postId;
  //const  content  = req.body;
  const content = req.body.content; 
  if (!content) {
    console.error(`Error adding comment to post: Missing 'content' in the request body.`);
    return res.status(400).send('Bad Request: Missing comment content');
  }
  const sanitizedContent = DOMPurify.sanitize(content, { ALLOWED_TAGS: ['b', 'u', 'strong'] });
  const username = req.session.username;
const blogPostData = await redisClient.hGetAll(`blogpost:${postId}`);
    if (!blogPostData || Object.keys(blogPostData).length === 0) {
      console.error(`Error adding comment to post: Blog post with ID ${postId} not found.`);
      res.status(404).send('Blog post not found');
      return;
    }
// Kontrollera om inlägget är markerat som raderat
    if (blogPostData.deleted === 'true') {
      console.error(`Error adding comment to post: Blog post with ID ${postId} is deleted.`);
      res.status(404).send('Blog post is deleted');
      return;
    }
    const date = new Date();
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
    const comments = JSON.parse(blogPostData.comments || '[]');
 // Lägg till den nya kommentaren
    comments.push({
      content: content,
      username: username,
      createdAt: formattedDate,
    });
    // Uppdatera kommentarerna i Redis
    await redisClient.hSet(`blogpost:${postId}`, 'comments', JSON.stringify(comments));
    res.redirect('/protected')
  } )
;


const getCommentsForPost = async (postId) => {
  const commentsKey = `post:${postId}:comments`;
return new Promise((resolve, reject) => {
    redisClient.hGet(commentsKey, 'comments', (err, comments) => {
      if (err) {
        reject(err);
      } else {
        resolve(comments ? JSON.parse(comments) : []);
      }
    });
  });
};


const getAllBlogPosts = async () => {
  const postIds = await redisClient.keys('blogpost:*');
  const likesCount = await redisClient.hGet(`blogpost:${postId}`, 'likes');

  const blogPosts = await Promise.all(
    postIds.map(async (postId) => {
      const blogPostData = await redisClient.hGetAll(postId);
     // Check if the blog post is deleted or not
      if (blogPostData.deleted === 'true') {
        return null;
      }
      return {
        postId: postId.split(':')[1],
        likes: likesCount,
        ...blogPostData
      };
    })
  );
  return blogPosts.filter(post => post !== null);
};



//RADERA
app.delete('/protected/delete-post/:postId', authenticate,  async (req, res) => {
  try {
    const postId = req.params.postId;
    const username = req.session.username;
    const isAdmin = await redisClient.get(`admin:${username}`);
const blogPost = await redisClient.hGetAll(`blogpost:${postId}`);
    const blogPostOwner = blogPost.username;
if (!isAdmin && blogPostOwner !== username) {
      return res.status(403).send('Förbjudet: du är inte tillåten att ta bort detta blogginlägg');
    }
    console.log(postId)
    await redisClient.del(`blogpost:${postId}`);

    // Uppdatera sidan
    const updatedBlogPosts = await getAllBlogPosts();
    res.json(updatedBlogPosts);
  } catch (error) {
    console.error('Det gick inte att ta bort inlägget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/like', authenticate, async (req, res) => {
  try {
    const { postId } = req.body;
    const user = req.session.username;

    const hasLiked = await redisClient.sIsMember(`likes:${postId}`, user);

    if (hasLiked) {
      // User has already liked the post, handle accordingly
      res.json({ success: false, message: 'User has already liked the post' });
      return;
    }
    await redisClient.sAdd(`likes:${postId}`, user);

    //await redisClient.sAdd(`likes:${username}`, username);
    await redisClient.hIncrBy(`post:${postId}`, 'likes', 1);
    // Get the updated like count
    const updatedLikeCount = await redisClient.hGet(`post:${postId}`, 'likes');

    io.emit('notification', { message: `${user} gillade inlägg ${postId}`, likesCount: updatedLikeCount });
res.json({ success: true, message: 'Post liked successfully', likesCount: updatedLikeCount });
} catch (error) {
    console.error(error);
    // Respond with an internal server error
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/hasLiked', authenticate, async (req, res) => {
  try {
    const { postId } = req.body;
    const username = req.session.username;
    const hasLiked = await redisClient.sIsMember(`likes:${postId}`, username);

    res.json(hasLiked);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getLikes/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Hämta likes-informationen för det givna inlägget från Redis
    const likesCount = await redisClient.hGet(`post:${postId}`, 'likes');

    // Returnera likes-informationen som JSON
    res.json({ likesCount: parseInt(likesCount) || 0 });
  } catch (error) {
    console.error(error);
    // Respond with an internal server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

io.on('connection', (socket) => {
 
const userId = socket.request.session.username
socket.join(userId);

  // Lyssna på disconnect-eventet
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('send', async (data) => {
    try {
      const post = await redisClient.hGet(`blogpost:${postId}`);
      io.to(post.userId).emit ('notification', {
        postId: data.postId,
        userId: username
      })
    } catch (error) {
      console.error("error")
    }
  })
});
const port = 5005;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});




