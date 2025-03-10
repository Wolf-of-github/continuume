import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Toast from '../components/Toast';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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
      setLoading(true);
      
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();      
      
      if (data.success === false) {
        setLoading(false);
        showToast('error', data.message); 
        return;
      }
      setLoading(false);
      navigate('/email-verification-call-out');
      

    } catch (error) {
      setLoading(false);
      showToast('error', "Programming error");
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Full Name'
          className='border-2 p-3 rounded-lg'
          id='fullname'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Username'
          className='border-2 p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border-2 p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border-2 p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>

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
