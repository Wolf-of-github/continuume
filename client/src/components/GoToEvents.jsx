import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function GoToEvents() {
  
  const navigate = useNavigate();
  
  const handleGoClick = () =>{
    navigate('/events');
  }

  return (
    // <div className="flex"> 
      
    //   <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
    //     <h2 className="text-xl font-bold text-gray-800 mb-3">Events</h2>
    //     <p className="text-gray-600 mb-4">View the events calendar to stay updated of upcomming events</p>

    //     <button type="button" className = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>handleGoClick()}>Go</button>

    //   </div>


    // </div> 

    <div className="p-4 md:w-1/3">
    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M10.5 8.25h3l-3 4.5h3" />
      </svg>


        </div>
        <h2 className="text-gray-900 text-lg title-font font-medium">Events</h2>
      </div>
      <div className="flex-grow">
        <p className="leading-relaxed text-base">View the events calendar to stay updated of upcomming events</p>
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
