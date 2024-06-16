// src/pages/Home.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="home">
      {currentUser ? (
        <div>
          <div>Welcome, {currentUser.name}!</div>
          <nav>
            <ul>
              <li>
                <Link to="/form">Go to Form</Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div>Please log in to see personalized content.</div>
      )}
    </div>
  );
};

export default Home;
