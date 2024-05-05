<<<<<<< HEAD
import React, { useState } from 'react';
// import Avatar from './Avatar'; // avatar är en separat komponent då ?

const Footer = () => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);

  const handleLogout = () => {
    if (!logoutConfirmed) {
      setShowLogoutConfirmation(true);
    } else {
      // Implementera logik för utloggning här
      console.log('Utloggning...');
    }
  };

  const confirmLogout = () => {
    setLogoutConfirmed(true);
    setShowLogoutConfirmation(false);
    // Du kan lägga till ytterligare logik här, om det behövs
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <footer style={footerStyle}>
      <div style={avatarContainerStyle}>
        {/* <Avatar /> */}
      </div>
      <div style={menuContainerStyle}>
        <button onClick={handleLogout} style={buttonStyle}>Logga ut</button>
        {showLogoutConfirmation && (
          <div style={logoutConfirmationStyle}>
            <img src="twitterbild" alt="Twitterbild" style={imageStyle} />
            <p>Vill du logga ut?</p>
            <button onClick={confirmLogout} style={confirmButtonStyle}>Ja</button>
            <button onClick={cancelLogout} style={cancelButtonStyle}>Avbryt</button>
          </div>
        )}
      </div>
    </footer>
=======
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileAvatar from "../assets/woffer.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Footer = () => {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    setUser({ following: [], followers: [] });
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        id="logoutButton"
        variant="primary"
        style={{ backgroundColor: "#314528" }}
        onClick={handleShow}
      >
        ...
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <img src={profileAvatar} alt="profileavatar" className="avatar" />
            {user.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Vill du logga ut?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ backgroundColor: "#314528" }}
            onClick={handleLogout}
          >
            Japp!
          </Button>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#BC1823" }}
            onClick={handleClose}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
  );
};

const footerStyle = {
<<<<<<< HEAD
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f0f0f0',
};

const avatarContainerStyle = {
  marginRight: '10px',
};

const menuContainerStyle = {
  position: 'relative',
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const logoutConfirmationStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#fff',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  maxWidth: '100%',
  marginBottom: '10px',
=======
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#f0f0f0",
};

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
  //   position: "absolute",
  //   top: "100%",
  right: 0,
  backgroundColor: "#fff",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  fontSize: "medium",
  fontWeight: "50",
};

const imageStyle = {
  maxWidth: "100%",
  marginBottom: "10px",
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
};

const confirmButtonStyle = {
  ...buttonStyle,
<<<<<<< HEAD
  backgroundColor: 'green',
=======
  backgroundColor: "#314528",
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
};

const cancelButtonStyle = {
  ...buttonStyle,
<<<<<<< HEAD
  backgroundColor: 'red',
  marginLeft: '10px',
=======
  backgroundColor: "#BC1823",
  marginLeft: "10px",
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
};

export default Footer;

<<<<<<< HEAD
=======
// const Footer = () => {
//   const navigate = useNavigate();
//     const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
//     const [logoutConfirmed, setLogoutConfirmed] = useState(false);
//   const { user, setUser, users, isLoggedIn, setIsLoggedIn, isFollowing } =
//     useContext(UserContext);

//   const handleLogout = () => {
//     setUser({ following: [] });
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <footer>
//       <div style={menuContainerStyle}>
//         <div className="footercontainer">
//           <img src={profileAvatar} alt="profileavatar" className="avatar" />
//           {user.username}
//           {isLoggedIn ? (
//             <button onClick={handleLogout} style={buttonStyle}>
//               Logga ut
//             </button>
//           ) : (
//             <button onClick={() => navigate("/login")}>Logga in</button>
//           )}
//         </div>
//       </div>
//     </footer>
//   );
// };

// // const footerStyle = {
// //   display: "flex",
// //   justifyContent: "space-between",
// //   alignItems: "center",
// //   padding: "10px",
// //   backgroundColor: "#f0f0f0",
// // };

// const avatarContainerStyle = {
//   marginRight: "10px",
// };

// const menuContainerStyle = {
//   position: "relative",
// };

// const buttonStyle = {
//   padding: "5px 10px",
//   backgroundColor: "#314528",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// const logoutConfirmationStyle = {
//   position: "absolute",
//   top: "100%",
//   right: 0,
//   backgroundColor: "#fff",
//   padding: "10px",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
// };

// const imageStyle = {
//   maxWidth: "100%",
//   marginBottom: "10px",
// };

// const confirmButtonStyle = {
//   ...buttonStyle,
//   backgroundColor: "green",
// };

// const cancelButtonStyle = {
//   ...buttonStyle,
//   backgroundColor: "red",
//   marginLeft: "10px",
// };

// const profileImg = {
//   marginRight: "1rem",
//   width: "40px",
//   height: "40px",
//   borderRadius: "50%",
//   backgroundColor: "#89937e",
// };

// export default Footer;
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
