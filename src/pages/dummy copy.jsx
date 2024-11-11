import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import icons from react-icons

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRememberMeChange = () => setRememberMe(!rememberMe);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="font-sans antialiased text-gray-900">
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
                <div>
                    <a href="/">
                        <h2 className="text-3xl font-bold">
                            LOREM <span className="bg-[#f84525] text-white px-2 rounded-md">IPSUM</span>
                        </h2>
                    </a>
                </div>

                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form method="POST" action="/login">
                        <div className="py-8">
                            <center>
                                <span className="text-2xl font-semibold">Log In</span>
                            </center>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="w-6 h-6" />
                                        ) : (
                                            <FiEye className="w-6 h-6" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="block mt-4">
                            <label htmlFor="remember_me" className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember_me"
                                    name="remember"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    className="text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-600 ms-2">Remember Me</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <a
                                className="text-sm text-gray-600 rounded-md hover:underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                href="/password/reset"
                            >
                                Forgot your password?
                            </a>

                            <button
                                type="submit"
                                className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
