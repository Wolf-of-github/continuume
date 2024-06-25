import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export default function GoToForm() {
  return (
    <div className="flex"> 
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mt-4 ml-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Application</h2>
        <p className="text-gray-600 mb-4">Please complete the series of forms to proceed with your application.</p>
        {/* <Link to="/form" className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md font-semibold uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Go to Form
        </Link> */}

        <Link to = '/form' type="button" className = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go</Link>        
      </div>


    </div> 
  );
}
