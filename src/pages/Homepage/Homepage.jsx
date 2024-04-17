import React, { useState } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar";
import "../../index.css";

function Homepage() {
  function CreateTweet() {
    return (
      <div className={styles.createTweetBox}>
        <div className={styles.profileImg} />
        <div className={styles.createInput}>
          <textarea placeholder="Skriv din tweet här" />
        </div>
        <button>Tweet</button>
      </div>
    );
  }

  function TweetPost() {
    return (
      <div className={styles.tweetBox}>
        <div className="tweetHeader">
          <h3>Laban Labansson</h3> <em>@laban</em>
        </div>
        <div className={styles.tweetBody}>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <div className={styles.tweetButtons}>
          <button>Gilla</button>
          <button>Kommentera</button>
          <button>Retweeta</button>
        </div>
      </div>
    );
  }

  function SearchBar() {
    return <div className={styles.searchBox}>SÖKFÄLT</div>;
  }

  function Trending() {
    return (
      <div className={styles.trendingBox}>
        <h3>Trendande tweets</h3>
        <ul>
          <li>Lista med tweets</li>
          <li>Lista med tweets</li>
          <li>Lista med tweets</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className={styles.tweetFeedContainer}>
          <div className={styles.tweetFeed}>
            <CreateTweet />

            <TweetPost />
            <TweetPost />
            <TweetPost />
            <TweetPost />
          </div>
        </div>
      </div>
      <div className="sidebar">
        <SearchBar />
        <Trending />
      </div>
      <div className="footer">FOOTER</div>
    </div>
  );
}

export default Homepage;
