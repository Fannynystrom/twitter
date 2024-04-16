import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react";
import Homepage from "./pages/Homepage/Homepage.jsx";
import LoginForm from "./components/Register.jsx";
import RegisterForm from "./components/Register.jsx";

import "./index.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
