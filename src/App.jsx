import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
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
