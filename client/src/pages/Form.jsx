import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PersonalDetails from '../components/PersonalDetails';
import Education from '../components/Education';
import TravelAndVisa from '../components/TravelAndVisa';
import { useSelector } from 'react-redux';

const Form = () => {
  
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    personal_details: {
      name: '',
      email: '',
    },
    education: {
      school: '',
      degree: '',
    },
    travelAndVisa: {
      passportNumber: '',
      visaType: '',
    },
  });

  const [selectedForm, setSelectedForm] = useState('PersonalDetails');


  const handleFormDataChange = (section, data) => {
    setFormData({
      ...formData,
      [section]: data,
    });
  };

  const saveFormData = async () => {
    // try {
      
    //   const userId = currentUser._id;
    //   const res = await fetch(`/api/form/create/${userId}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
  
    //   const data = await res.json();
  
    //   if (!res.ok) {
    //     throw new Error(data.message || 'Failed to save form data');
    //   }
      
    //   console.log('Form data saved successfully:', data);
    // } catch (error) {
    
    //   console.error('Error saving form data:', error.message);
    // }
    console.log(`/api/form/create/${currentUser._id}`)
  };
  

  const goToNextSection = () => {
    switch (selectedForm) {
      case 'PersonalDetails':
        setSelectedForm('Education');
        break;
      case 'Education':
        setSelectedForm('TravelAndVisa');
        break;
      default:
        break;
    } 
  };

  const goToPreviousSection = () => {
    switch (selectedForm) {
      case 'Education':
        setSelectedForm('PersonalDetails');
        break;
      case 'TravelAndVisa':
        setSelectedForm('Education');
        break;
      default:
        break;
    }
  };

  const renderFormSection = () => {
    switch (selectedForm) {
      case 'PersonalDetails':
        return <PersonalDetails data={formData.personal_details} onChange={(data) => handleFormDataChange('personal_details', data)} />;
      case 'Education':
        return <Education data={formData.education} onChange={(data) => handleFormDataChange('education', data)} />;
      case 'TravelAndVisa':
        return <TravelAndVisa data={formData.travelAndVisa} onChange={(data) => handleFormDataChange('travelAndVisa', data)} />;
      default:
        return <div>Select a form from the sidebar.</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setSelectedForm} />
      <main className="flex-1 p-6 bg-[#f1f5f9]">
        {renderFormSection()}
        <div className="mt-4 flex justify-between">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={goToPreviousSection}>Back</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={goToNextSection}>Next</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={saveFormData}>Save</button>
        </div>
      </main>
    </div>
  );
};

export default Form;
