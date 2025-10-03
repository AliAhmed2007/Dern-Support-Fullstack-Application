import React from 'react';
import { Link } from 'react-router-dom';
import NotFound404 from "../assets/icons/404-dark.svg";
import useTheme from '../hooks/useTheme';
import logo from "../assets/icons/logo.png";

export default function UnAuthorized() {
    const { darkMode } = useTheme();

    return (
        <div className={`relative min-h-screen bg-gradient-to-br ${darkMode ? 'from-dark-surface-primary to-dark-background' : 'from-gray-50 to-gray-100'} relative overflow-hidden flex items-center justify-center`}>
            <main className="container mx-auto px-4 z-10 flex justify-center items-center">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Logo */}
                    <div className="flex justify-center items-center flex-col md:flex-row mt-[-150px] mb-10">
                        <img src={logo} alt="Dern-Support Logo" className='w-3xs' />
                        <h1 className={`md:ml-[-50px] md:mt-[75px] text-3xl md:text-4xl font-mono font-semibold ${darkMode ? 'text-dark-primary' : 'text-gray-800'}`}>Dern Support</h1>
                    </div>
                    {/* Error Code */}
                    <div className="mb-8 md:mb-12">
                        <p className={`text-3xl md:text-4xl font-mono font-semibold ${darkMode ? 'text-dark-primary' : 'text-gray-800'} mb-4`}>
                            Error
                        </p>
                        <div className="ms-13">
                            <svg width="472" height="158" viewBox="0 0 472 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="207.396" y="82.847" width="57.5655" height="20.7141" rx="2.63433" fill="#7592FF" stroke="#7592FF" stroke-width="0.752667" />
                                <rect x="203.103" y="41.7015" width="22.1453" height="20.7141" rx="2.63433" fill="#7592FF" stroke="#7592FF" stroke-width="0.752667" />
                                <rect x="246.752" y="41.7015" width="22.1453" height="20.7141" rx="2.63433" fill="#7592FF" stroke="#7592FF" stroke-width="0.752667" />
                                <rect x="191.654" y="98.2308" width="22.1453" height="20.7141" rx="2.63433" fill="#7592FF" stroke="#7592FF" stroke-width="0.752667" />
                                <rect x="258.201" y="98.2308" width="22.1453" height="20.7141" rx="2.63433" fill="#7592FF" stroke="#7592FF" stroke-width="0.752667" />
                                <rect x="152.769" y="15.167" width="166.462" height="130.311" rx="28" stroke="#7592FF" stroke-width="24" />
                            </svg>
                        </div>
                        <h1 className='mt-5 text-6xl'>403</h1>
                        <p className={`${darkMode ? 'text-dark-secondary' : 'text-light-secondary'} text-lg my-8 max-w-xl mx-auto`}>
                            You're not the right user to access this data You're not authorized to show this data.
                        </p>
                    </div>

                    {/* Back to Home Button */}
                    <Link
                        to="/"
                        className={`inline-block ${darkMode ? 'bg-dark-accent hover:bg-dark-accent-hover text-dark-primary' : 'bg-primary hover:bg-primary-dark'} px-8 py-3 rounded-lg duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all`}
                    >
                        Back to Home Page
                    </Link>

                    {/* Footer */}
                    <footer className="absolute left-0 right-0 bottom-10">
                        <p className={`${darkMode ? 'text-dark-secondary' : 'text-gray-500'} text-sm`}>
                            © 2025 - Dern-Support
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
