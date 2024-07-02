import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Console() {
  const navigate = useNavigate();
  const options = [
    { label: 'User Accounts', path: '/manage-users' },
    { label: 'Resources', path: '/manage-resources' },
    { label: 'Events', path: '/manage-events' },
  ];  

  return (
    <div className="min-h-screen flex-1 flex-col items-center justify-center bg-slate-100 p-4 w-full">
      {options.map((option, index) => (
        <div
          key={index}
          className="w-full p-4 mb-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition duration-200"
          onClick={() => navigate(option.path)}
        >
          <h2 className="text-xl font-semibold text-gray-700 text-center">{option.label}</h2>
        </div>
      ))}
    </div>
  );
}
