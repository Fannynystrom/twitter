import styles from "./Navbar.module.css";
import "../index.css";

function Navbar() {
  return (
    <nav className="header">
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Twitterish</h1>
        </div>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
