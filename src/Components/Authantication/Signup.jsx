import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';
import LogoText from '../../assets/svg logo.svg';
import backgroundImage from '../../assets/background.png';
import { axiosInstance } from '../../../axios/axiosInstance';
import { createElement } from 'react';

export default function Signup() {

    const navigate = useNavigate();
    const otpBtn = useRef(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        otp: '',
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
            const usernameAvailablability = await axiosInstance.post('/auth/attempt', {
                user_name: formData.username
            })
            const usernameAvailable = usernameAvailablability.data.availability
            if (!usernameAvailable) {
                //username not available
                document.getElementById('username_availability').innerHTML = "This username isn't available. Please try another."

            } else if (usernameAvailable) {
                //username available
                const createUser = await axiosInstance.post('/auth/signup', {
                    user_name: formData.username,
                    user_email: formData.email,
                    user_otp: formData.otp,
                    user_mobile_no: formData.mobile,
                    user_password: formData.password,
                },
                    {
                        withCredentials: true
                    })
                if (createUser.status >= 200 && createUser.status < 300) {
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

    async function sendOtp() {

        if (formData.email) {
            otpBtn.current.innerHTML = 'Sending';
            try {
                const send = await axiosInstance.post('/auth/email/verify', {
                    user_email: formData.email
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (send.status >= 200 && send.status < 300) {
                   otpBtn.current.innerHTML = 'Re-Send'; 
                } else {
                    otpBtn.current.innerHTML = 'Retry';
                }
            } catch (error) {
                otpBtn.current.innerHTML = 'Retry';
            }
        }
    }

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
                        <div className='flex flex-row w-[100%]'>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-[70%] px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                            <button
                                type='button'
                                ref={otpBtn}
                                className='bg-blue-500 hover:ring-2 hover:ring-blue-500 cursor-pointer text-white rounded-r-xl w-[30%]'
                                onClick={() => {sendOtp()}}
                            >
                                Send OTP
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter otp send to your Email</label>
                        <input
                            type="text"
                            inputMode='numeric'
                            pattern='[0-9]*'
                            maxLength='6'
                            name="otp"
                            value={formData.otp}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter OTP"
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
