import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setMessage('A password reset link has been sent to your email address.');
      } else {
        setMessage(data.error || 'Failed to send reset link.');
      }
    } catch (error) {
      setLoading(false);
      setMessage('Failed to send reset link.');
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
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Send Reset Link'}
              </button>
            </form>
            {message && <p className="mt-5">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
