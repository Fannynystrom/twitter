import styles from "./Navbar.module.css";
import "../index.css";
import logotype from "../assets/logotype_dark.svg";
import React from 'react';
import { Link, useNavigate } from "react-router-dom";



function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log(isAuthenticated); 
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); 
  };


  return (
    <nav className="header">
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logotype} alt="woofer_logo" />
        </div>
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
            {isAuthenticated ? (
          <button onClick={handleLogout}>Logga ut</button>
        ) : (
          <button onClick={() => navigate('/login')}>Logga in</button>
        )}
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
