import React, { useState } from 'react';
import axios from 'axios';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forget-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error requesting password reset:', error);
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gray-800">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
                <h3 className="mb-3 text-4xl font-extrabold text-white text-center">Forgot Password?</h3>
                <p className="mb-4 text-white text-center">Enter your email to receive password reset link</p>
                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email*</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="mail@loopple.com"
                        className="w-full px-4 py-3 mt-1 text-sm bg-grey-200 text-white placeholder-white text-dark-grey-900 rounded-lg focus:outline-none focus:border-purple-blue-500"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button type="submit" className="w-full py-3 text-sm font-bold leading-none text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-600">Send Reset Link</button>
                <p className="mt-4 text-sm text-center text-white">{message}</p>
            </form>
        </div>
    );
}

export default ForgetPassword;
