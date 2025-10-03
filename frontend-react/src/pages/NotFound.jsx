import React from 'react';
import { Link } from 'react-router-dom';
import NotFound404 from "../assets/icons/404-dark.svg";
import useTheme from '../hooks/useTheme';
import logo from "../assets/icons/logo.png";

function NotFound() {
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
            <img src={NotFound404} alt="404 Error" className="mx-auto" />
            <p className={`${darkMode ? 'text-dark-secondary' : 'text-light-secondary'} text-lg my-8 max-w-xl mx-auto`}>
              We can't seem to find the page you're looking for. It might have been moved or doesn't exist anymore.
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

export default NotFound;