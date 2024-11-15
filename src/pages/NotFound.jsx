import React from 'react';

const NotFound = ({sentence}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Oops! Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for does not exist or has been moved.
        {sentence}
      </p>
      <a 
        href="/" 
        className="px-4 py-2 mt-6 text-white transition duration-200 rounded bg-primary hover:bg-primary/80"
      >
        Go Back to Home
      </a>
    </div>
  );
}

export default NotFound;
