import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const query = new URLSearchParams(location.search);
      const token = query.get('token');

      if (token) {
        try {
          const response = await fetch(`/api/auth/verify?token=${token}`);
          const result = await response.json();

          if (response.ok) {
            setMessage('Email verified successfully!');
            navigate('/sign-in'); // Redirect to sign-in page on success
          } else {
            setMessage(result.error || 'Verification failed. Please try again.');
          }
        } catch (error) {
          setMessage('Verification failed. Please try again.');
        }
      } else {
        setMessage('No token provided.');
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
