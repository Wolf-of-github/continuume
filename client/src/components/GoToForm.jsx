import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { selectUserIdToView, setUserToView, clearUserToView } from '../redux/form/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function GoToForm() {
  
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

  const handleGoClick = () =>{
    
    if (currentUser.role === 'admin'){
      dispatch(clearUserToView())
    }
    navigate('/form');
  }

  return (
    <div className="p-4 md:w-1/3">
    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>

        </div>
        <h2 className="text-gray-900 text-lg title-font font-medium">Profile</h2>
      </div>
      <div className="flex-grow">
        <p className="leading-relaxed text-base">Please fill in your details to complete your profile</p>
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
