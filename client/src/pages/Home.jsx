import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoToForm from '../components/GoToForm';


const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="home">
      {currentUser ? (
        <div className='bg-slate-100 h-dvh'>
          <GoToForm /> {/* Display the card component if user is logged in */}
        </div>
      ) : (
        <div>Please log in to see personalized content.</div>
      )}
    </div>
  );
};

export default Home;
