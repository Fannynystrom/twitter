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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    work: "",
    website: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData((prev) => ({ ...prev, error: "Lösenorden matchar inte." }));
      return;
    }
    try {
      const { confirmPassword, error, ...userData } = formData;
      await registerUser(userData);
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        about: "",
        work: "",
        hometown: "",
        website: "",
        error: "",
      });
      navigate("/login");
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        error:
          "Ett fel uppstod vid registrering: " + error.response.data.message,
      }));
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(
            ([key, value]) =>
              key !== "error" && (
                <div key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input
                    type={key.includes("password") ? "password" : "text"}
                    name={key}
                    value={value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required={[
                      "username",
                      "password",
                      "confirmPassword",
                      "firstName",
                      "lastName",
                      "email",
                    ].includes(key)}
                  />
                </div>
              )
          )}
          <button id="register" type="submit">Register</button>
          {formData.error && <p className="error">{formData.error}</p>}
        </form>
      </div>
    </div>
  );
};
// <div className="container">
//   <div className="form-container">
//     <h2>Register</h2>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={formData.username}
//           onChange={(e) => setFormData.username(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={formData.password}
//           onChange={(e) => setFormData.password(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Confirm Password:</label>
//         <input
//           type="password"
//           value={formData.confirmPassword}
//           onChange={(e) => setFormData.confirmPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Firstname:</label>
//         <input
//           type="text"
//           value={formData.firstName}
//           onChange={(e) => setFormData.firstName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Lastname:</label>
//         <input
//           type="text"
//           value={formData.lastName}
//           onChange={(e) => setFormData.lastName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData.email(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>about:</label>
//         <input
//           type="text"
//           value={formData.about}
//           onChange={(e) => setFormData.about(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>work:</label>
//         <input
//           type="text"
//           value={formData.work}
//           onChange={(e) => setFormData.work(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>hometown:</label>
//         <input
//           type="text"
//           value={formData.hometown}
//           onChange={(e) => setFormData.hometown(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>website:</label>
//         <input
//           type="text"
//           value={formData.website}
//           onChange={(e) => setFormData.website(e.target.value)}
//         />
//       </div>

//       <button type="submit">Register</button>
//     </form>
//   </div>
// </div>

export default RegisterForm;

