import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Oops! Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <a 
        href="/" 
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition duration-200"
      >
        Go Back to Home
      </a>
    </div>
  );
}

export default NotFound;
