import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "../components/Login"; // Observera att du importerar LoginForm, inte Login
import { UserProvider } from "../context/UserContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

describe("LoginForm", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </Router>
    );
  });
});
