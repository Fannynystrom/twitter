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
  const [users, setUsers] = useState([]);
  const { user, setUser, isLoggedIn, setIsLoggedIn, isFollowing } =
    useContext(UserContext);
  // const isAuthenticated = localStorage.getItem("isAuthenticated");
  // const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setUser({ following: [] });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logotype} alt="woofer_logo" />
        </div>
        {isLoggedIn && user ? (
          <div className={styles.userName}>
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
                <li key={userItem._id}>
                  {userItem.username}
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
