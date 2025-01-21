import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    try {
      // Make a POST request to the backend with email and password.
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
      console.log(backendUrl);

      // If login is successful, store the token and display a success message.
      if (response.data.success) {
        setToken(response.data.token);
        toast.success('Login successful!');
      } else {
        // Handle unsuccessful login attempts.
        toast.error(response.data.message || 'Login failed. Please try again.');
        console.error(response.data.message);
      }
    } catch (error) {
      // Log and display errors encountered during the API call.
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || 'An unexpected error occurred.'
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            className="mt-2 w-full bg-black text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
