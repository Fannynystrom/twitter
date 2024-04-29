// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Homepage from "./pages/Homepage/Homepage.jsx";
// import Profilepage from "./pages/Homepage/Profilepage.jsx";

// import LoginForm from "./components/Login.jsx";
// import RegisterForm from "./components/Register.jsx";
// import "./index.css";
// import Navbar from "./components/Navbar.jsx";
// import Footer from "./components/Footer.jsx";

// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/profile" element={<Profilepage />} /> 

//       </Routes>
//       <Footer />
//     </Router>
   
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Profilepage from "./pages/Homepage/Profilepage.jsx";
import LoginForm from "./components/Login.jsx";
import RegisterForm from "./components/Register.jsx";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { UserProvider } from "./context/UserContext.jsx"
function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profilepage />} />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
