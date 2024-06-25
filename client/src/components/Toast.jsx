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
        <div className={`p-2 rounded text-white`}>
          {type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>          
          )}
          {type === 'error' && (
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
         </svg>
         
          )}
          {type === 'warning' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
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
