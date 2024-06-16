// src/pages/Form.jsx

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PersonalDetails from '../components/PersonalDetails';
import Education from '../components/Education';
import TravelAndVisa from '../components/TravelAndVisa';

const Form = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const renderForm = () => {
    switch (selectedForm) {
      case 'PersonalDetails':
        return <PersonalDetails />;
      case 'Education':
        return <Education />;
      case 'TravelAndVisa':
        return <TravelAndVisa />;
      default:
        return <div>Select a form from the sidebar.</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setSelectedForm} />
      <main className="flex-1 p-6 bg-[#f1f5f9]">
        {renderForm()}
      </main>
    </div>
  );
};

export default Form;
