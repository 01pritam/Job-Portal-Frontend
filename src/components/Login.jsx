import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { useAuth } from '../context/AuthContext';
import {useUser} from '../context/UserContext'
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { loginUser, userRole, completeProfile } = useAuth();
    const {userType}=useUser(); // Use userRole and completeProfile from useAuth
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await loginUser({
            email: formData.email,
            password: formData.password,
            role: userType.toLowerCase() // Use selected user role
        });

        // if (!result.success) {
        //     setError(result.error || 'Login failed');
        // } else {
        //     // Check if profile is complete, then navigate accordingly
        //     if (completeProfile) {
        //         navigate('/'); // Redirect to home page
        //     } else {
        //         // Navigate to profile page based on user role
        //         const profilePath = userRole === 'jobseeker' ? '/jobseeker/profile' : '/employer/profile';
        //         navigate(profilePath);  // Use navigate instead of history.push
        //     }
        // }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-gray-600">Please sign in to your account</p>

                    {/* Show logged-in user role */}
                    {userRole && (
                        <p className="mt-2 text-blue-600 font-semibold text-sm">
                            Logging in as <span className="capitalize">{userRole}</span>
                        </p>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link to="/forgot-pass" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;