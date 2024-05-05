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
        console.log('respons', response.data.tweets)
        setTweets(response.data.tweets);
        console.log('tweets' , tweets)

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
    const hashtagsRegex = /#(\S+)/g; // inkluderar allt utom mellanslag
    const hashtags = tweetText.match(hashtagsRegex);
    return hashtags ? hashtags.map((tag) => tag.slice(1)) : [];
  }


  const saveTweet = async (tweetText) => {
    const hashtags = extractHashtags(tweetText);
    console.log('#', hashtags)
    if (hashtags && hashtags.length > 0) {
      console.log('inne i if')
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
        console.log('tweet: ', tweets)
      });
    } 
    console.log('inga tecken: ', tweets)
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

  return (
    <div className={styles.trendingBox}>
      <h3>Trending hashtags</h3>
      <ul>
        {trendingHashtags.map((tag, index) => (
          <li key={index} className="trendingList">
            <em>
              {" "}
              <b> #{tag.tag}</b> - {tag.count} posts
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingHashtags;
