import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000);
    setToasts([...toasts, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const verifyEmail = async () => {
      const query = new URLSearchParams(location.search);
      const token = query.get('token');

      if (token) {
        try {
          const response = await fetch(`/api/auth/verify?token=${token}`);
          const result = await response.json();

          if (response.ok) {
            showToast('success', 'Email verified successfully!');
            navigate('/sign-in'); // Redirect to sign-in page on success
          } else {
            showToast('error', result.message || 'Verification failed. Please try again.');
          }
        } catch (error) {
          showToast('error', 'Verification failed. Please try again.');
        }
      } else {
        showToast('error', 'No token provided.');
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div>
      <h1 className='text-red-500'>Email Verification Done/Failed</h1>
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
};

export default VerifyEmail;
