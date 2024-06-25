import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={onCancel} 
            className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-red-700 text-white rounded px-4 py-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
