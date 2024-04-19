
const router = express.Router();

const twitterPostSchema = new mongoose.Schema({
    content: String,
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    // ...andra fält som createdAt, author osv.
  });
  
router.post('/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId; // eller från en session om du använder autentisering
  
    try {
      const post = await TwitterPost.findById(postId);
  
      // Kontrollera om användaren redan har gillat inlägget
      if (post.likes.includes(userId)) {
        // Ta bort like om användaren redan gillat
        post.likes.remove(userId);
      } else {
        // Lägg till användarens id till likes-arrayen om inte redan gillat
        post.likes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ likes: post.likes.length });
    } catch (error) {
      res.status(500).json({ message: "Något gick fel", error: error });
    }
  });
  

  export default router;
