// import React, { useState } from "react";
// import { registerUser } from "../API/RegisterAPI";
// import "./loginRegister.css";
// import { useNavigate } from "react-router-dom";


// const RegisterForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [occupation, setOccupation] = useState(""); // Nytt fält
//   const [hometown, setHometown] = useState(""); // Nytt fält
//   const [website, setWebsite] = useState(""); // Nytt fält
//   const [registrationDate, setRegistrationDate] = useState(""); // Nytt fält
//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Lösenorden matchar inte.");
//       return;
//     }
  
//     const userData = {
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//     };
  
//     try {
//       await registerUser(userData);
//       //nollställer formuläret
//       setUsername("");
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setError("");
//       navigate("/login");
//     } catch (error) {
//       setError("Ett fel uppstod vid registrering: " + error.response.data.message);
//     }
//   };
  
//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Firstname:</label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Lastname:</label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

// import React, { useState } from "react";
// import { registerUser } from "../API/RegisterAPI";
// import "./loginRegister.css";
// import { useNavigate } from "react-router-dom";

// const RegisterForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [about, setAbout] = useState(""); // Nytt fält
//   const [occupation, setOccupation] = useState(""); // Nytt fält
//   const [hometown, setHometown] = useState(""); // Nytt fält
//   const [website, setWebsite] = useState(""); // Nytt fält
//   const [registrationDate, setRegistrationDate] = useState(""); // Nytt fält
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Lösenorden matchar inte.");
//       return;
//     }
  
//     const userData = {
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       about,
//       occupation,
//       hometown,
//       website,
//       registrationDate
//     };
  
//     try {
//       await registerUser(userData);
//       // Nollställ formuläret
//       setUsername("");
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setAbout("");
//       setOccupation("");
//       setHometown("");
//       setWebsite("");
//       setRegistrationDate("");
//       setError("");
//       navigate("/login");
//     } catch (error) {
//       setError("Ett fel uppstod vid registrering: " + error.response.data.message);
//     }
//   };
  
//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Firstname:</label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Lastname:</label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           {/* Lägg till nya fält */}
//           <div>
//             <label>About:</label>
//             <textarea
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Occupation:</label>
//             <input
//               type="text"
//               value={occupation}
//               onChange={(e) => setOccupation(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Hometown:</label>
//             <input
//               type="text"
//               value={hometown}
//               onChange={(e) => setHometown(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Website:</label>
//             <input
//               type="url"
//               value={website}
//               onChange={(e) => setWebsite(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Registration Date:</label>
//             <input
//               type="date"
//               value={registrationDate}
//               onChange={(e) => setRegistrationDate(e.target.value)}
//             />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from "react";
import { registerUser } from "../API/RegisterAPI"; 
import "./loginRegister.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState(""); // Nytt fält
  const [occupation, setOccupation] = useState(""); // Nytt fält
  const [hometown, setHometown] = useState(""); // Nytt fält
  const [website, setWebsite] = useState(""); // Nytt fält
  const [registrationDate, setRegistrationDate] = useState(""); // Nytt fält
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }
  
    const userData = {
      username,
      password,
      firstName,
      lastName,
      email,
      about, 
      occupation,
      hometown,
      website,
      registrationDate
    };
  
    try {
      await registerUser(userData);
      // Nollställ formuläret
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAbout("");
      setOccupation("");
      setHometown("");
      setWebsite("");
      setRegistrationDate("");
      setError("");
      navigate("/login"); 
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">Firstname:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Lastname:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* Lägg till nya fält */}
          <div>
            <label htmlFor="about">About:</label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="hometown">Hometown:</label>
            <input
              type="text"
              id="hometown"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">Website:</label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="registrationDate">Registration Date:</label>
            <input
              type="date"
              id="registrationDate"
              value={registrationDate}
              onChange={(e) => setRegistrationDate(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

