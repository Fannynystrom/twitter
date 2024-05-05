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
    hometown: "",
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
                  <label htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </label>
                  <input
                    id={key}
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
          <button id="register" type="submit">
            Register
          </button>
          {formData.error && <p className="error">{formData.error}</p>}
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
