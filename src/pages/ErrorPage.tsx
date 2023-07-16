import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-6">
          We encountered an error. The page you are search is not found.
        </p>
        <Link to={'/'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
