import React, { useState } from 'react';
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { app } from '../firebase';

const PersonalDetails = ({ data, onChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };
  
  return (
    <div className="" id = 'pds'>
    
      <div className='text-xl font-medium pb-4 text-indigo-500'>Personal Details</div>

      <form className=''>
        <div className="grid grid-cols-2 gap-4">  
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.firstName} 
                onChange={handleInputChange} 
                placeholder="Enter your first name"
                name = 'firstName'
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.lastName} 
                onChange={handleInputChange} 
                placeholder="Enter your last name"
                name = 'lastName'
              />
            </div>          

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.email} 
                onChange={handleInputChange} 
                placeholder="Enter your email"
                name = 'email'
              />
            </div>       

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.phoneNumber} 
                onChange={handleInputChange} 
                placeholder="Enter your contact"
                name = 'phoneNumber'
              />
            </div>   

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth
              </label>
              <input type='date'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.dateOfBirth} 
                onChange={handleInputChange}
                name = 'dateOfBirth'
              />
            </div>                     

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
              </label>
              <select
                name="gender"
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nationality
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.nationality} 
                onChange={handleInputChange}
                name = 'nationality'
                placeholder='Enter your nationality'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Country of Birth
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.countryOfBirth} 
                onChange={handleInputChange}
                name = 'countryOfBirth'
                placeholder='Enter your birth country'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Native Language
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.nativeLanguage} 
                onChange={handleInputChange}
                name = 'nativeLanguage'
                placeholder='Enter your native language'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Passport Number
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.passportNumber} 
                onChange={handleInputChange}
                name = 'passportNumber'
                placeholder='Enter your passport Number'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name as per passport
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.nameAsPerPassport} 
                onChange={handleInputChange}
                name = 'nameAsPerPassport'
                placeholder='Enter your name as per passport'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Passport issue location
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.passportIssueLocation} 
                onChange={handleInputChange}
                name = 'passportIssueLocation'
                placeholder='Enter your passport issue location'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Passport Issue Date
              </label>
              <input type='date'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.passportIssueDate} 
                onChange={handleInputChange}
                name = 'passportIssueDate'
                placeholder='Enter your passport issue date'
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Passport expiry date
              </label>
              <input type='date'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.passportExpiryDate} 
                onChange={handleInputChange}
                name = 'passportExpiryDate'
                placeholder='Enter your passport expiry date'
              /> 
            </div>            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.addressP} 
                onChange={handleInputChange}
                name = 'addressP'
                placeholder='Enter your street name'
              /> 
            </div>            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Postal Code
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.postalCodeP} 
                onChange={handleInputChange}
                name = 'postalCodeP'
                placeholder='Enter your zip code'
              /> 
            </div>            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.stateP} 
                onChange={handleInputChange}
                name = 'stateP'
                placeholder='Enter your state'
              /> 
            </div>            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.cityP} 
                onChange={handleInputChange}
                name = 'cityP'
                placeholder='Enter your city'
              /> 
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Emergency contact name
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.emergencyContactName} 
                onChange={handleInputChange}
                name = 'emergencyContactName'
                placeholder='Enter emergencey contact name'
              /> 
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Emergency contact number
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.emergencyContactNumber} 
                onChange={handleInputChange}
                name = 'emergencyContactNumber'
                placeholder='Enter your emergency contact number'
              /> 
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Emergency contact email
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.emergencyContactEmail} 
                onChange={handleInputChange}
                name = 'emergencyContactEmail'
                placeholder='Enter your emergency contact email'
              /> 
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Emergency contact relation
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.emergencyContactRelation} 
                onChange={handleInputChange}
                name = 'emergencyContactRelation'
                placeholder='Enter your emergency contact relation'
              /> 
            </div>                          

        </div>
      </form>

      
    </div>
  );
};

export default PersonalDetails;
