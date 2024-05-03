import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from "../components/Login";

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mocking the loginUser function
jest.mock('../API/LoginAPI', () => ({
  loginUser: jest.fn(),
}));

describe('LoginForm', () => {
  it('should submit the form with username and password', async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);

    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    });
  });

  // Add more test cases as needed
});


