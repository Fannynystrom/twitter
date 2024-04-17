import styles from "./Navbar.module.css";
import "../index.css";
import logotype from "../assets/logotype_dark.svg";

function Navbar() {
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
