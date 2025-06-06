import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/background.png';
import { axiosInstance } from '../../../axios/axiosInstance';


export default function Login() {
  const [user_email_or_user_name, setuser_email_or_user_name] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {console.log("login")
    e.preventDefault();
    try {
      const login = await axiosInstance.post('/auth/login',
        {
          user_email_or_user_name: user_email_or_user_name,
          user_password: password
        }, {
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'Authorization': 'Bearer your_token'
        },
        withCredentials: true
      })
      if (login.statusText === "OK") { window.location.href = "/"};
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
            <input
              type="text"
              required
              name='user_email_or_user_name'
              value={user_email_or_user_name}
              onChange={(e) => setuser_email_or_user_name(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
