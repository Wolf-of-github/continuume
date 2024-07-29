import React, { useState } from 'react';
import Toast from '../components/Toast'; // Adjust the path as needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [passwordSent, setPasswordSent] = useState(false)

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
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      setLoading(false);
      if (res.ok) {
        showToast('success', 'A password reset link has been sent to your email address.');
        setPasswordSent(true)
      } else {
        showToast('error', result.message || 'Failed to send reset link.');
      }
    } catch (error) {
      setLoading(false);
      showToast('error', 'Failed to send reset link.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-6 sm:py-12">
      <div className="w-full max-w-md p-4">
        <div className="flex rounded-lg h-full bg-white shadow-md p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 19.5H8.25m11.25 0v11.25" />
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Forgot Password</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">
              Please enter your email address to reset your password.
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type="email"
                placeholder="Email"
                className="mt-3 w-full p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="mt-3 items-center bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-95"
                disabled={loading || passwordSent }
              >
                {loading ? 'Loading...' : passwordSent ? 'Sent': 'Send Reset Link'}
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
