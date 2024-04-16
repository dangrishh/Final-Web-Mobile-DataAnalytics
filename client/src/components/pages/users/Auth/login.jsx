import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });
            
            alert('Login successful!');
            // Redirect to the desired page upon successful login
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error logging in:', error.response?.data?.message || error.message);
            // Handle error (e.g., show error message to the user)
        }
    };

    // Function to toggle show/hide password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gray-800"> {/* Changed background color */}
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
                <h3 className="mb-3 text-4xl font-extrabold text-white text-center">Sign In</h3>
                <p className="mb-4 text-gray-400 text-center">Enter your username and password</p>

                <div className="mb-3">
                    <label htmlFor="username" className="block text-sm font-medium text-white">Username*</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="john_doe"
                        className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="block text-sm font-medium text-white">Password*</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Show/hide password based on showPassword state
                            placeholder="Enter your password"
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

                <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className="mr-2 leading-tight"
                        />
                        <span className="text-sm font-normal text-white">Keep me logged in</span>
                    </label>
                    <a href="./forget-Password" className="text-sm font-medium text-white">Forget password?</a>
                </div>
                
                <button type="submit" className="w-full py-3 text-sm font-bold leading-none text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-600">Sign in</button>
                
                <p className="mt-4 text-sm text-center text-gray-400">Not registered yet? <a href="./registration" className="font-bold text-purple-blue-500 hover:text-purple-blue-600">Create an Account</a></p>
            </form>
        </div>
    );
}

export default Login;
