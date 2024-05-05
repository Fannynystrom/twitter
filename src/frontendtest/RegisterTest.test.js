import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import RegisterForm from "../components/Register";
import { registerUser } from "../API/RegisterAPI"; // Importera registerUser-funktionen

jest.mock("../API/RegisterAPI"); // Mocka registerUser-funktionen

describe("RegisterForm", () => {
  it("submits registration form with user data", async () => {
    render(
      <Router>
        <UserProvider>
          <RegisterForm />
        </UserProvider>
      </Router>
    );

    // Fyll i formulärfält
    fireEvent.change(screen.getByLabelText("Username:"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("ConfirmPassword:"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("FirstName:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("LastName:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("About:"), {
      target: { value: "About me..." },
    });
    fireEvent.change(screen.getByLabelText("Work:"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByLabelText("Hometown:"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByLabelText("Website:"), {
      target: { value: "https://example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));
    // fireEvent.change(screen.getByLabelText("Registration Date"), { target: { value: "2022-05-01" } });

    // Vänta på att registreringsprocessen ska slutföras
    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        username: "testuser",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        about: "About me...",
        work: "Developer",
        hometown: "New York",
        website: "https://example.com",
        // registrationDate: '2022-05-01'
      });
    });
  });
});
