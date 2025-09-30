"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    // Store token in localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Show success message
                    alert('Account created successfully! Welcome to Evolvia!');
                    
                    // Redirect to home page or dashboard
                    window.location.href = '/';
                } else {
                    // Handle specific field errors
                    if (data.field && data.field !== 'general') {
                        setErrors({
                            ...errors,
                            [data.field]: data.message
                        });
                    } else {
                        alert(data.message || 'Signup failed. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('Network error. Please check your connection and try again.');
            }
        }
    };

    return (
        <>
            <section className="relative min-h-screen w-full flex items-center justify-center">
                <div>
                    <img
                        src="/background1.jpg"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover -z-10"
                    />
                    <div className="absolute inset-0 bg-black opacity-60 z-10 w-full h-full" />
                </div>

                <div className="relative z-20 w-full max-w-md mx-auto p-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <Image
                                    src="/logo.png"
                                    alt="Evolvia Logo"
                                    width={60}
                                    height={60}
                                    priority
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Join Evolvia</h1>
                            <p className="text-gray-300">Create your account to get started</p>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition duration-300 ${
                                            errors.firstName ? 'border-red-400' : 'border-white/20'
                                        }`}
                                        placeholder="First name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition duration-300 ${
                                            errors.lastName ? 'border-red-400' : 'border-white/20'
                                        }`}
                                        placeholder="Last name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition duration-300 ${
                                        errors.email ? 'border-red-400' : 'border-white/20'
                                    }`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition duration-300 ${
                                        errors.password ? 'border-red-400' : 'border-white/20'
                                    }`}
                                    placeholder="Create a password"
                                />
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition duration-300 ${
                                        errors.confirmPassword ? 'border-red-400' : 'border-white/20'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className={`w-4 h-4 mt-1 text-[#F39C12] bg-white/10 border rounded focus:ring-[#F39C12] focus:ring-2 ${
                                        errors.agreeToTerms ? 'border-red-400' : 'border-white/20'
                                    }`}
                                />
                                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-300">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-[#F39C12] hover:text-yellow-400 transition duration-300">
                                        Terms and Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-[#F39C12] hover:text-yellow-400 transition duration-300">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.agreeToTerms && (
                                <p className="text-red-400 text-xs mt-1">{errors.agreeToTerms}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-[#F39C12] hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 focus:ring-offset-transparent mt-6"
                            >
                                Create Account
                                <i className="ml-2 fa-solid fa-user-plus"></i>
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-300">
                                Already have an account?{' '}
                                <Link href="/login" className="text-[#F39C12] hover:text-yellow-400 font-medium transition duration-300">
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center mt-4">
                            <Link href="/" className="text-gray-400 hover:text-white text-sm transition duration-300">
                                <i className="fa-solid fa-arrow-left mr-2"></i>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
