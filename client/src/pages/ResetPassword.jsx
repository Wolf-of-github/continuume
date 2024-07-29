import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast'; // Adjust the path as needed

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [toasts, setToasts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get('token');

  // Function to show toast
  const showToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000);
    setToasts([...toasts, { id, type, message }]);
  };

  // Function to remove toast
  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('success', 'Password reset successfully!');
        // Delay navigation to allow toast to be displayed
        setTimeout(() => {
          navigate('/sign-in');
        }, 3000); // Adjust time to match your toast display duration
      } else {
        showToast('error', data.error || 'Failed to reset password.');
      }
    } catch (error) {
      showToast('error', 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Reset Password</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='password'
          placeholder='New Password'
          className='border-2 p-3 rounded-lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
          Reset Password
        </button>
      </form>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
