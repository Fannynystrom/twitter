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
  );
};

const footerStyle = {
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
};

const confirmButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'green',
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'red',
  marginLeft: '10px',
};

export default Footer;

