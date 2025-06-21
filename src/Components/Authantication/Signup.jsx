import axios from 'axios';
import React, { useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';
import LogoText from '../../assets/svg logo.svg';
import backgroundImage from '../../assets/background.png';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        //checking username availability
        try {
            const usernameAvailablability = await axios.post('http://localhost:3000/auth/attempt', {
                user_name: formData.username
            })
            const usernameAvailable = usernameAvailablability.data.availability
            if (!usernameAvailable) {
                //username not available
                document.getElementById('username_availability').innerHTML = "This username isn't available. Please try another."

            } else if (usernameAvailable) {
                //username available
                const createUser = await axios.post('http://localhost:3000/auth/signup', {
                    user_name: formData.username,
                    user_email: formData.email,
                    user_mobile_no: formData.mobile,
                    user_password: formData.password,
                },
                    {
                        withCredentials: true
                    })
                if (createUser.status >=200 && createUser.status < 300) {
                    window.location.href = "/";
                }
                else {
                    console.error("Signup error:", error);
                    alert("Something went wrong. Please try again.");
                }

            }
        } catch (error) {

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <img className='w-18' src={LogoText} alt="swan logo" />
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your username"
                        />
                        <div id='username_availability' className='text-xs'></div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1234567890"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
