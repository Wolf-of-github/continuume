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
    <div className="flex"> 
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full ">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Application</h2>
        <p className="text-gray-600 mb-4">Please complete the series of forms to proceed with your application.</p>

        <button type="button" className = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>handleGoClick()}>Go</button>

      </div>


    </div> 
  );
}
