import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logotype from "../assets/logotype_dark.svg";
import FollowButton from "./FollowButton"; // Importera FollowButton
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import btnStyles from "./FollowButton.module.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, users, isLoggedIn, setIsLoggedIn, isFollowing } =
    useContext(UserContext);
  // const isAuthenticated = localStorage.getItem("isAuthenticated");
  // const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    setUser({ following: [] });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">
            {" "}
            <img src={logotype} alt="woofer_logo" />
          </a>
        </div>
        {isLoggedIn && user ? (
          <div className={styles.profileName}>
            {user.username}
            <hr />
          </div>
        ) : (
          ""
        )}
        <div className={styles.menu}>
          <ul>
            <li>
              <a href="/">Hem</a>
            </li>

            <li>
              <Link to="/profile">Profil</Link>
            </li>
            <li>
              <a href="/">Upptäck</a>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout}>Logga ut</button>
              ) : (
                <button onClick={() => navigate("/login")}>Logga in</button>
              )}
            </li>
          </ul>
        </div>
        <div className={styles.profilesList}>
          <ul>
            <h4>Woofers</h4>
            <hr />
            {isLoggedIn &&
              user &&
              users.map((userItem) => (
                <li className={styles.userName} key={userItem._id}>
                  <Link to={`/profile/${userItem._id}`}>
                    {userItem.username}
                  </Link>
                  {user._id !== userItem._id && !isFollowing(userItem._id) ? (
                    <FollowButton
                      userId={userItem._id}
                      className={btnStyles.followBtnNavbar}
                    />
                  ) : null}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
