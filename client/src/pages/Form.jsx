import React, { useEffect, useState } from 'react';
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
      imageUrls: [],
      pdf1Url: '',
      pdf2Url: '',
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
  
  const [formExists, setFormExists] = useState(false); 
  const [selectedForm, setSelectedForm] = useState('PersonalDetails');
  const [formDataModified, setFormDataModified] = useState(false); // Track if formData has been modified
  console.log(selectedForm)
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const userId = currentUser._id;
      const res = await fetch(`/api/form/read/${userId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch form data');
      }

      setFormData(data); // Populate form fields with retrieved data
      setFormExists(true); // Set formExists to true if form data exists

    } catch (error) {
      console.error('Error fetching form data:', error.message);
    }
  };

  const handleFormDataChange = (section, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: { ...prevFormData[section], ...data },
    }));
    setFormDataModified(true);
  };

  const saveFormData = async () => {
    try {
      const endpoint = formExists ? `/api/form/update/${currentUser._id}` : `/api/form/create/${currentUser._id}`;
      const method = formExists ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save form data');
      }
      
      console.log('Form data saved successfully:', data);
      setFormDataModified(false); // Reset formDataModified after successful save
    } catch (error) {
      console.error('Error saving form data:', error.message);
    }
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
      <main className="flex-1 p-6 bg-gray-800">
        
          {renderFormSection()}
        
        <div className="mt-4 flex justify-between">
          
          <button className={`px-4 py-2 rounded ${selectedForm != 'PersonalDetails'? 'bg-blue-500 text-white': ' bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={goToPreviousSection}>Back</button>

          <button className={`px-4 py-2 rounded ${selectedForm != 'TravelAndVisa'? 'bg-blue-500 text-white': ' bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={goToNextSection}>Next</button>
          
          <button className={`px-4 py-2 rounded ${formDataModified ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={saveFormData} disabled={!formDataModified}>
            Save
          </button>

        </div>
        
      </main>
    </div>
  );
};

export default Form;
