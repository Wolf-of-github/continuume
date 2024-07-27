import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function GoToResource() {
  
  const navigate = useNavigate();
  
  const handleGoClick = () =>{
    navigate('/resource');
  }

  return (
    <div className="p-4 md:w-1/3">
    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        </svg>


        </div>
        <h2 className="text-gray-900 text-lg title-font font-medium">Resources</h2>
      </div>
      <div className="flex-grow">
        <p className="leading-relaxed text-base">View and download resources required by international universities for the application process </p>
        <button className="mt-3 text-indigo-500 inline-flex items-center" onClick={()=>handleGoClick()}>Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
    </div>    
  );
}
