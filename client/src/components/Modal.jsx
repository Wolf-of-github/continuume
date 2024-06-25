import React from 'react';

const Modal = ({ show, onClose, onConfirm, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4">{title}</h2>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white rounded-lg px-4 py-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
