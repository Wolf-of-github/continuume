import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PersonalDetails from '../components/PersonalDetails';
import Education from '../components/Education';
import TravelAndVisa from '../components/TravelAndVisa';
import { useSelector } from 'react-redux';
import { selectUserIdToView } from '../redux/form/formSlice';
import Chat from '../components/Chat';

const Form = () => {
  
  const { currentUser } = useSelector((state) => state.user);
  const userIdToView = useSelector(selectUserIdToView);

  const [formData, setFormData] = useState({
    personal_details: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      countryOfBirth: '',
      nativeLanguage: '',
      nameAsPerPassport: '',
      passportIssueLocation: '',
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      addressP: '',
      postalCodeP: '',
      stateP: '',
      cityP: '',
      // addressC: '',
      // postalCodeC: '',
      // stateC: '',
      // cityC: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactEmail: '',
      emergencyContactRelation: '',      
    },
    education: {
      school: '',
      schoolCountry: '',
      schoolAddress: '',
      schoolStartDate: '',
      schoolEndDate: '',
      schoolGrade: '',
      highSchool: '',
      highSchoolCountry: '',
      highSchoolAddress: '',
      highSchoolStartDate: '',
      highSchoolEndDate: '',
      highSchoolGrade: '',

      bachelorsInstitute: '',
      bachelorIn: '',
      bachelorsCountry: '',
      bachelorsAddress: '',
      bachelorsStartDate: '',
      bachelorsEndDate: '',
      bachelorsGrade: '',
      
      greTaken: '',
      greTotalScore: 0,
      greVerbalScore: 0,
      greQuantScore: 0, 
      greAWAScore:0,
      greTestDate: '',

      toeflTaken: '',
      toeflTotalScore: 0,
      toeflTestDate: '',

    },
    travelAndVisa: {
      visaRefuse: '',
      refusedFor: '',
      refusingCountry: '',
      refusalDate: '',
      refusalReason: '',
    },
  });
  
  const [formExists, setFormExists] = useState(false); 
  const [selectedForm, setSelectedForm] = useState('PersonalDetails');
  const [formDataModified, setFormDataModified] = useState(false); // Track if formData has been modified
  
  useEffect(() => {
    
      fetchData();
    
  }, []);
  
  
  const fetchData = async () => {
    try {
      const userId = userIdToView !== null ? userIdToView : currentUser._id;
      
      const res = await fetch(`/api/form/read/${userId}`);
      const data = await res.json();
  
      if (!res.ok) {
        if (res.status != 404) {
          throw new Error(data.message || 'Failed to fetch form data');
        }
        
      }
      else{
        setFormData(data); // Populate form fields with retrieved data
        setFormExists(true); // Set formExists to true if form data exists
      }
  
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

      <div className="flex h-screen">
        <div className="flex bg-blue-200"> {/* Section 1 */}
          <Sidebar className="" onSelect={setSelectedForm} />
        </div>
        
        <div className="flex-1 grid grid-rows-10 grid-cols-4 bg-gray-800">
          
          <div className="row-span-9 col-span-3 overflow-auto pl-3 py-5 pr-3">
            {renderFormSection()}
          </div>
          
          <div style={{ borderLeft: "0.5px solid white" }} className="row-span-10 col-span-1 bg-gray-800">
            <Chat selectedForm={selectedForm}/>           
          </div>
          
          <div className="row-span-1 col-span-3">
            <div className="flex justify-between">
              <div>
                <button className={`px-4 py-2 rounded ml-3 ${selectedForm !== 'PersonalDetails' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={goToPreviousSection}>
                  Back
                </button>
                
                <button className={`px-4 py-2 rounded ml-3 ${selectedForm != 'TravelAndVisa' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={goToNextSection}>
                  Next
                </button>
              </div>
              
              <button className={`px-4 py-2 rounded mr-3 ${formDataModified && userIdToView === null ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={saveFormData} disabled={!formDataModified && !userIdToView === null}>
                Save
              </button>
            </div>
          </div>

        </div>
      </div>

  );
};

export default Form;