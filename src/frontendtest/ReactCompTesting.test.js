// import React from "react";
// import { render } from "@testing-library/react";
// import LoginForm from "../components/Login"; // Observera att du importerar LoginForm, inte Login
// import { UserProvider } from "../context/UserContext.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// describe("LoginForm", () => {
//   it("renders without crashing", () => {
//     render(
//       <Router>
//         <UserProvider>
//           <LoginForm />
//         </UserProvider>
//       </Router>
//     );
//   });
// });

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginForm from "../components/Login"; 
import { UserProvider } from "../context/UserContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

describe("LoginForm", () => {
  it("submits login form with username and password", async () => {
    render(
      <Router>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </Router>
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fireEvent.click(loginButton);

    // Wait for async login process to complete
    await waitFor(() => {
      expect(window.location.pathname).toEqual("/"); // Replace with expected redirect path after successful login
    });
  });
});

