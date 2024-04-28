import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Profilepage from "./pages/Homepage/Profilepage.jsx";

import LoginForm from "./components/Login.jsx";
import RegisterForm from "./components/Register.jsx";
import "./index.css";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/profile/:userId" element={<Profilepage />} />
      </Routes>
    </Router>
  );
}

export default App;
