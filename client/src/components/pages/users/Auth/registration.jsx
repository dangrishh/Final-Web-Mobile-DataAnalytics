import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFullnameChange = (e) => {
        setFullname(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Toggle visibility for password and confirm password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                fullname,
                email,
                username,
                password,
            });

            alert('Registration successful!');
            setMessage(response.data.message);
            // Navigate to the login page after successful registration
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gray-800">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
                <h3 className="mb-3 text-4xl font-extrabold text-white text-center">Register</h3>
                <p className="mb-4 text-gray-400 text-center">Create your account</p>
                
                <div className="mb-3">
                    <label htmlFor="fullname" className="block text-sm font-medium text-white">Fullname*</label>
                    <input
                        id="fullname"
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                        value={fullname}
                        onChange={handleFullnameChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="username" className="block text-sm font-medium text-white">Username*</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email*</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="mail@loopple.com"
                        className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="block text-sm font-medium text-white">Password*</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter a password"
                            className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-white"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password*</label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-white"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full py-3 text-sm font-bold leading-none text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-600">
                    Register
                </button>

                <p className="mt-4 text-sm text-center text-gray-400">{message}</p>
                <p className="mt-4 text-sm text-center text-gray-400">
                    Already have an account? <a href="/login" className="font-bold text-purple-blue-500 hover:text-purple-blue-600">Sign In</a>
                </p>
            </form>
        </div>
    );
}

export default RegistrationForm;
