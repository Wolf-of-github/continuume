import React, { useState } from 'react';
import {BSON} from "realm-web";
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const WorkDetails = ({ data, onChange }) => {

  const [workDetails, setWorkDetails] = useState(data); 

  const handleAddWorkDetails = () => {
    setWorkDetails([
      ...workDetails,
      {
        _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
        jobTitle: '',
        organiztionName: '',
        organiztionAdd: '',
        organiztionPhone: '',
        startDate: '',
        endDate: '',
        jobCertificate: '',
        },
    ]);
  };
  
  

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkDetails = [...workDetails];
    updatedWorkDetails[index] = { ...updatedWorkDetails[index], [name]: value };
    setWorkDetails(updatedWorkDetails);
    onChange(updatedWorkDetails);
  };

  const handleRemoveWorkDetails = (index) => {
    const updatedWorkDetails = workDetails.filter((_, i) => i !== index);
    setWorkDetails(updatedWorkDetails);
    onChange(updatedWorkDetails);
  };

  const storeFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }; 

  const handleFileUpload = async (index, file) => {
    try {
      const downloadURL = await storeFile(file);
      const updatedWorkDetails = [...workDetails];
      updatedWorkDetails[index].jobCertificate = downloadURL;
      setWorkDetails(updatedWorkDetails);
      onChange(updatedWorkDetails);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = (index) => {
    const updatedWorkDetails = [...workDetails];
    updatedWorkDetails[index].jobCertificate = ''; 
    setWorkDetails(updatedWorkDetails);
    onChange(updatedWorkDetails);
  };

  return (
    <div>
      <h2>Work Details</h2>
      <form>
        {workDetails.map((workDetail, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job Title
                </label>
                <input
                  type='text'
                  name='jobTitle'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.jobTitle}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter job title'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Organiztion Name
                </label>
                <input
                  type='text'
                  name='organiztionName'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.organiztionName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter organiztion name offering the job'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Organiztion Address
                </label>
                <input
                  type='text'
                  name='organiztionAdd'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.organiztionAdd}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter organiztion location or city'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Organiztion Phone or Contact
                </label>
                <input
                  type='text'
                  name='organiztionPhone'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.organiztionPhone}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter organization contact info'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job start date
                </label>
                <input
                  type='date'
                  name='startDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.startDate}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter exact job start date'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job end date
                </label>
                <input
                  type='date'
                  name='endDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.endDate}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter job end date'
                />
              </div>

              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certification
                </label>
                <input
                  type='file'
                  accept='application/pdf,image/*'
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleFileUpload(index, e.target.files[0]);
                    }
                  }}
                />
                {workDetail.fileUrl && (
                  <div className='mt-2'>
                    <a href={workDetail.fileUrl} target='_blank' rel='noopener noreferrer'>
                      View Document
                    </a>
                    <button
                      type='button'
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleFileDelete(index)}
                    >
                      Delete Document
                    </button>
                  </div>
                )}
              </div>


            </div>

            <button
              type='button'
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => handleRemoveWorkDetails(index)}
            >
              Remove Job
            </button>
          </div>
        ))}
        
        <button
          type='button'
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddWorkDetails}
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default WorkDetails;
