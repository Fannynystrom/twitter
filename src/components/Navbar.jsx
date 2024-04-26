import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logotype from "../assets/logotype_dark.svg";

function Navbar() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logotype} alt="woofer_logo" />
        </div>
        {isAuthenticated && user ? (
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
              <a href="/">Profil</a>
            </li>
            <li>
              <a href="/">Upptäck</a>
            </li>
            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout}>Logga ut</button>
              ) : (
                <button onClick={() => navigate("/login")}>Logga in</button>
              )}
            </li>
          </ul>
          <div className={styles.profilesList}>
            <ul>
              <h4>Woofers</h4>
              <hr />
              {users.map((userItem) => (
                <li key={userItem._id} className={styles.userNames}>
                  {userItem.username}{" "}
                  {/* Eller något annat attribut du vill visa */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
