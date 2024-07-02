import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function GoToAnnouncement() {
  
  const navigate = useNavigate();
  
  const handleGoClick = () =>{
    navigate('/announcement');
  }

  return (
    <div className="flex"> 
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Announcements</h2>
        <p className="text-gray-600 mb-4">Check the latest Announcements to stay up to date</p>

        <button type="button" className = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>handleGoClick()}>Go</button>

      </div>


    </div> 
  );
}
