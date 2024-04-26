import { useEffect, useState } from "react";
import styles from "../pages/Homepage/Homepage.module.css";
import axios from "axios";
import { getTweets } from "../API/TweetApi";

function TrendingHashtags() {
  const [tweets, setTweets] = useState([]);
  const [trendingHashtags, setTrendingHashtags] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tweets");
        setTweets(response.data.tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hashtags");
        setTrendingHashtags(response.data);
      } catch (error) {
        console.error("Error fetching trending hashtags:", error);
      }
    };

    fetchTrendingHashtags();
  }, []);

  const extractHashtags = (tweetText) => {
    const hashtagsRegex = /#(\w+)/g;
    const hashtags = tweetText.match(hashtagsRegex);
    return hashtags ? hashtags.map((tag) => tag.slice(1)) : [];
  };

  const saveTweet = async (tweetText) => {
    const hashtags = extractHashtags(tweetText);
    if (hashtags && hashtags.length > 0) {
      hashtags.forEach(async (tag) => {
        try {
          await axios.post("http://localhost:3000/api/hashtags", { tag });
          getTrendingHashtags(); // Uppdatera trending hashtags
        } catch (error) {
          console.error("Error saving hashtag:", error);
        }
      });
    }
  };

  useEffect(() => {
    if (tweets && tweets.length > 0) {
      tweets.forEach((tweet) => {
        saveTweet(tweet.content);
      });
    }
  }, [tweets]);

  const getTrendingHashtags = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/hashtags");
      setTrendingHashtags(response.data.slice(0, 10)); // Hämta de 5 mest populära hashtagsen
    } catch (error) {
      console.error("Error fetching trending hashtags:", error);
    }
  };

  useEffect(() => {
    getTrendingHashtags();
  }, []);

  // console.log("trending", trendingHashtags)

  return (
    <div className={styles.trendingBox}>
      <h3>Trending hashtags</h3>
      <ul>
        {trendingHashtags.map((tag, index) => (
          <li key={index}>
            #{tag.tag} - {tag.count} posts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingHashtags;

// import { useEffect, useState } from "react";
// import styles from "../pages/Homepage/Homepage.module.css";

// import axios from "axios";

// function TrendingHashtags() {
//     const [tweets, setTweets] = useState([]);
//     const [trendingHashtags, setTrendingHashtags] = useState([]);

//     // const tweets = [
//     //   "Idag är det matchdag! #hejaGnaget",
//     //   "Vilken fantastisk ledare @carro är, alltid inspirerande och stöttande! #carro",
//     //   "Stolt över vårt lag och dess prestationer. #hejaGnaget",
//     //   "Grattis till @carro för att vara en sådan fantastisk vän och kollega! #carro",
//     //   "Att äta ett äpple om dagen håller doktorn borta! #äpple",
//     //   "Gott med lite snus efter maten. #snus",
//     //   "Min son älskar brandbilar, han blir så glad när han ser en! #brandbil",
//     //   "Imagine if #Araujo didn't get a red card",
//     //   "jag ser verkligen upp till #carro, vilken kvinna!"
//     // ];

//     useEffect(() => {
//         const fetchTweets = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/api/tweets"); // Anropa din API-endpoint för att hämta tweetsen
//                 setTweets(response.data.tweets);
//             } catch (error) {
//                 console.error("Error fetching tweets:", error);
//             }
//         };

//         fetchTweets();
//     }, []);

//     const extractHashtags = (tweetText) => {
//         return TwitterPost.extractHashtags(tweetText);
//     };

//     const saveTweet = (tweetText) => {
//         const hashtags = extractHashtags(tweetText);
//         hashtags.forEach(async tag => {
//             try {
//                 await saveHashtag(tag);
//               } catch (error) {
//                 console.error("Error saving hashtag:", error);
//               }
//             });

//     };

//     // const getTrendingHashtags = () => {
//     //     const trendingHashtags = Object.entries(hashtagDatabase)
//     //         .sort((a, b) => b[1] - a[1]) // Sortera hashtags efter den som är mest poppis
//     //         .slice(0, 5); // Hämta de 5 mest använda
//     //     return trendingHashtags;
//     // };

//     // tweets.forEach(tweet => {
//     //   saveTweet(tweet);
//     // });

//     useEffect(() => {
//         tweets.forEach(tweet => {
//             saveTweet(tweet.content);
//         });
//     }, [tweets]);

//     const saveHashtag = async (tag) => {
//         try {
//           await axios.post("/api/hashtags", { tag }); //rout?
//           getTrendingHashtags();
//         } catch (error) {
//           console.error("Error saving hashtag:", error);
//         }
//       };

//       const getTrendingHashtags = async () => {
//         try {
//           const response = await axios.get("/api/hashtags");
//           if (response.data.hashtags) {
//             setTrendingHashtags(response.data.hashtags.slice(0, 5)); // Hämta de 5 mest populära hashtagsen
//           }
//         } catch (error) {
//           console.error("Error fetching trending hashtags:", error);
//         }
//       };

//       useEffect(() => {
//         getTrendingHashtags();
//       }, []);

//     // const trendingHashtags = getTrendingHashtags();

//     return (
//         <div className={styles.trendingBox}>
//             <h3>Trending hashtags</h3>
//             <ul>
//                 {trendingHashtags.map(([tag, count]) => (
//                     <li key={index}>#{tag.tag} - {tag.count} posts</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default TrendingHashtags;
