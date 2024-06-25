import { useEffect, useState } from 'react';

const Toast = ({ id, type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose(id);
  };

  return (
    <div
      id={id}
      className={`fixed bottom-8 right-8 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 px-1 py-1 rounded-lg shadow-md transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='flex items-center'>
        <div className='p-2 rounded text-white'>
          {type === 'success' && (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M5 13l4 4L19 7' />
            </svg>
          )}
          {type === 'error' && (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 3l18 18M3 21l18-18' />
            </svg>
          )}
          {type === 'warning' && (
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 9v3m0 4v.01' />
            </svg>
          )}
        </div>
        <div className='mr-2'>{message}</div>
        <button
          className='ml-auto text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600'
          onClick={handleClose}
        >
          <svg className='w-4 h-4' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M10 9.414l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
