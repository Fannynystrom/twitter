import React, { useState } from "react";
import { registerUser } from "../API/RegisterAPI"; // Importera registerUser-funktionen
import "./loginRegister.css";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Lägg till för att visa felmeddelanden
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }


    try {
      const userData = { username, password };
      await registerUser(userData);
      // Nollställ formuläret
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      navigate("/"); // eller vart du nu vill dirigera användaren efter registrering
    } catch (error) {
      setError("Ett fel uppstod vid registrering: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default RegisterForm;
