
import React, { useState } from "react";
import "./loginRegister.css";
import { registerUser } from './api'; // Importera registerUser-funktionen

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Lösenorden matchar inte.");
      return;
    }

    const userData = { username, password };

    try {
      const response = await registerUser(userData);
      console.log("Användaren har registrerats:", response);
      // Lägg till logik för att hantera lyckad registrering
    } catch (error) {
      console.error("Ett fel uppstod vid registrering:", error);
      // Lägg till logik för att hantera fel vid registrering
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
