import { useState, useContext } from "react";
import "./loginRegister.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/LoginAPI";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const response = await loginUser(userData);
      setIsLoggedIn("true");
      setUser(response);
      navigate("/");
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate("/register")}>
            Registrera dig
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
