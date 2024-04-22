import styles from "../pages/Homepage/Homepage.module.css";

function TrendingHashtags() {

    const tweets = [
      "Idag är det matchdag! #hejaGnaget",
      "Vilken fantastisk ledare @carro är, alltid inspirerande och stöttande! #carro",
      "Stolt över vårt lag och dess prestationer. #hejaGnaget",
      "Grattis till @carro för att vara en sådan fantastisk vän och kollega! #carro",
      "Att äta ett äpple om dagen håller doktorn borta! #äpple",
      "Gott med lite snus efter maten. #snus",
      "Min son älskar brandbilar, han blir så glad när han ser en! #brandbil",
      "Imagine if #Araujo didn't get a red card",
      "jag ser verkligen upp till #carro, vilken kvinna!"
    ];

    const extractHashtags = (tweetText) => {
      const hashtagsRegex = /#(\w+)/g;
      const hashtags = tweetText.match(hashtagsRegex);
      return hashtags ? hashtags.map(tag => tag.slice(1)) : [];
    };

    // ändra sen till mongo  ??
    const hashtagDatabase = [];

    const saveTweet = (tweetText) => {
      const hashtags = extractHashtags(tweetText);
      hashtags.forEach(tag => {
        if (hashtagDatabase[tag]) {
          hashtagDatabase[tag]++;
        } else {
          hashtagDatabase[tag] = 1;
        }
      });

    };

    const getTrendingHashtags = () => {
      const trendingHashtags = Object.entries(hashtagDatabase)
        .sort((a, b) => b[1] - a[1]) // Sortera hashtags efter den som är mest poppis
        .slice(0, 5); // Hämta de 5 mest använda
      return trendingHashtags;
    };

    tweets.forEach(tweet => {
      saveTweet(tweet);
    });

    const trendingHashtags = getTrendingHashtags();

    return (
      <div className={styles.trendingBox}>
        <h3>Trending hashtags</h3>
        <ul>
          {trendingHashtags.map(([tag, count]) => (
            <li key={tag}>#{tag} - {count} posts</li>
          ))}
        </ul>
      </div>
    );
  }

  export default TrendingHashtags;