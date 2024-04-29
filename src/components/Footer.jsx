import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Avatar from './Avatar'; // avatar är en separat komponent då ?

const Footer = () => {
  const navigate = useNavigate();
  //   const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  //   const [logoutConfirmed, setLogoutConfirmed] = useState(false);
  const { user, setUser, users, isLoggedIn, setIsLoggedIn, isFollowing } =
    useContext(UserContext);

  const handleLogout = () => {
    setUser({ following: [] });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <footer>
      <div style={profileImg}></div>
      <div style={menuContainerStyle}>
        <div>
          {user.username}
          {isLoggedIn ? (
            <button onClick={handleLogout} style={buttonStyle}>
              Logga ut
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Logga in</button>
          )}
        </div>
      </div>
    </footer>
  );
};

// const footerStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px",
//   backgroundColor: "#f0f0f0",
// };

const avatarContainerStyle = {
  marginRight: "10px",
};

const menuContainerStyle = {
  position: "relative",
};

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "#314528",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const logoutConfirmationStyle = {
  position: "absolute",
  top: "100%",
  right: 0,
  backgroundColor: "#fff",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const imageStyle = {
  maxWidth: "100%",
  marginBottom: "10px",
};

const confirmButtonStyle = {
  ...buttonStyle,
  backgroundColor: "green",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "red",
  marginLeft: "10px",
};

const profileImg = {
  marginRight: "1rem",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#89937e",
};

export default Footer;
