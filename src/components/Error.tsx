import React from "react";

interface ErrorMessageProps {
  message: string;
}

const Error: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Error;
