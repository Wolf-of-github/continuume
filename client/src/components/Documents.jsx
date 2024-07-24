import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';

const Documents = ({ data, onChange }) => {
  const [documents, setDocuments] = useState(data || {
    resume: '',
    passport: '',
    tenthMS: '',
    twelfthMS: '',
    sop: '',
    personalHistory: '',
    bachelorsMarkSheets: []
  });
  const [uploading, setUploading] = useState({});

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
          console.log(progress);
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

  const handleFileUpload = async (event, key) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploading((prev) => ({ ...prev, [key]: true }));

    try {
      const downloadURL = await storeFile(file);
      const updatedDocuments = { ...documents, [key]: downloadURL };
      setDocuments(updatedDocuments);
      onChange(updatedDocuments);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleMultipleFileUpload = async (event, key) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    
    setUploading((prev) => ({ ...prev, [key]: true }));

    try {
      const uploadPromises = files.map(file => storeFile(file));
      const downloadURLs = await Promise.all(uploadPromises);
      const updatedDocuments = {
        ...documents,
        [key]: [...(documents[key] || []), ...downloadURLs]
      };
      setDocuments(updatedDocuments);
      onChange(updatedDocuments);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleFileDelete = (key) => {
    const updatedDocuments = { ...documents, [key]: '' };
    setDocuments(updatedDocuments);
    onChange(updatedDocuments);
  };

  const handleMultipleFileDelete = (key, url) => {
    const updatedDocuments = {
      ...documents,
      [key]: documents[key].filter((fileUrl) => fileUrl !== url)
    };
    setDocuments(updatedDocuments);
    onChange(updatedDocuments);
  };

  return (
    <div className='flex flex-col space-y-4'>
      {['resume', 'passport', 'tenthMS', 'twelfthMS', 'sop', 'personalHistory'].map((docKey) => (
        <div className="relative z-0 w-full mb-5 group" key={docKey}>
          {documents[docKey] ? (
            <div>
              <div className='py-3'>
                <button type='button' onClick={() => handleFileDelete(docKey)} className="text-red-700 border border-red-700 rounded hover:shadow-lg p-1 mr-2">
                  Delete
                </button>
                <a href={documents[docKey]} target="_blank" rel="noopener noreferrer" className="text-lime-500 border border-lime-500 rounded hover:shadow-lg p-1">
                  View {docKey}
                </a>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="file"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                accept="application/pdf"
                onChange={(event) => handleFileUpload(event, docKey)}
                disabled={uploading[docKey]}
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Upload {docKey}
              </label>
            </div>
          )}
        </div>
      ))}

      <div className="relative z-0 w-full mb-5 group">
        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Upload Bachelors Mark Sheets</label>
        <input
          type="file"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          accept="application/pdf"
          multiple
          onChange={(event) => handleMultipleFileUpload(event, 'bachelorsMarkSheets')}
          disabled={uploading['bachelorsMarkSheets']}
        />
        {documents.bachelorsMarkSheets && documents.bachelorsMarkSheets.length > 0 && (
          <div className='mt-3'>
            {documents.bachelorsMarkSheets.map((url, index) => (
              <div key={index} className='flex items-center space-x-3'>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-lime-500 border border-lime-500 rounded hover:shadow-lg p-1">
                  View Mark Sheet {index + 1}
                </a>
                <button type='button' onClick={() => handleMultipleFileDelete('bachelorsMarkSheets', url)} className="text-red-700 border border-red-700 rounded hover:shadow-lg p-1">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
