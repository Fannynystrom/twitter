import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import LoginForm from "./components/Register.jsx";
import RegisterForm from "./components/Register.jsx";

import "./index.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      
      </Routes>
    </Router>
  );
}

export default App;
