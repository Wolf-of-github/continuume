import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoToForm from '../components/GoToForm';
import GoToResource from '../components/GoToResource'
import Calendar from '../components/Calendar';
import GoToEvents from '../components/GoToEvents';


const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="home">
      {currentUser ? (
        <div className='bg-slate-100 h-dvh'>
          <div className='flex justify-around gap-4 p-6'>
            <GoToForm />
            <GoToResource/>
            <GoToEvents/>
          </div>
        </div>
      ) : (
        <div>Please log in to see personalized content.
        </div>
        
      )}
    </div>
  );
};

export default Home;
