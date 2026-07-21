import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import Navbar from '../components/sharedComponents/Navbar';
import Footer from '../components/sharedComponents/Footer';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
        <div className="w-24 h-24 mb-6 text-red-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-600 mb-4 max-w-md mx-auto">
          An unexpected error occurred. Our team has been notified.
        </p>
        <p className="text-sm text-gray-500 mb-8 font-mono bg-gray-100 p-2 rounded">
          {error?.statusText || error?.message || 'Unknown Error'}
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow hover:bg-green-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
