import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Toast from '../components/Toast';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        showToast('error', data.message); // Show error toast
        return;
      }
      dispatch(signInSuccess(data));
      showToast('success', data.message); // Show error toast
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      showToast('error', error.message); // Show error toast
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border-2 p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border-2 p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-indigo-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <div className='flex gap-2'>
          <p>Dont have an account?</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700'>Sign up</span>
          </Link>
        </div>
        <Link to={'/forgot-password'} className='ml-auto'>
          <span className='text-blue-700'>Forgot Password?</span>
        </Link>
      </div>

      
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
      {/* Toasts */}
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
