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
    <div>
      <div className='text-xl font-medium pb-4 text-indigo-500'>Documents</div>
      
      <div className='flex flex-col space-y-4'>
        {['resume', 'passport', 'tenthMS', 'twelfthMS', 'sop', 'personalHistory'].map((docKey) => (
          <div className="relative z-0 w-full mb-5 group" key={docKey}>
            <div className='pb-2 font-semibold text-gray-700'>{docKey.charAt(0).toUpperCase() + docKey.slice(1)}</div>
            {documents[docKey] ? (
              <div>
                <div className='py-3'>
                  <button
                    type='button'
                    onClick={() => handleFileDelete(docKey)}
                    className="bg-red-500 text-white rounded hover:shadow-lg p-3 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    onClick={() => window.open(documents[docKey], '_blank', 'noopener,noreferrer')}
                    className="bg-gray-500 text-white rounded hover:shadow-lg p-3"
                  >
                    View {docKey}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-violet-50 file:text-indigo-500
                             hover:file:bg-violet-100"
                  accept="application/pdf"
                  onChange={(event) => handleFileUpload(event, docKey)}
                  disabled={uploading[docKey]}
                />
              </div>
            )}
          </div>
        ))}

        <div className="relative z-0 w-full mb-5 group">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Bachelors Mark Sheets</label>
          <input
            type="file"
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-violet-50 file:text-indigo-500
                       hover:file:bg-violet-100"
            accept="application/pdf"
            multiple
            onChange={(event) => handleMultipleFileUpload(event, 'bachelorsMarkSheets')}
            disabled={uploading['bachelorsMarkSheets']}
          />
          {documents.bachelorsMarkSheets && documents.bachelorsMarkSheets.length > 0 && (
            <div className='mt-3'>
              {documents.bachelorsMarkSheets.map((url, index) => (
                <div key={index} className='flex items-center space-x-3 py-1'>
                  <button
                    type='button'
                    onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                    className="bg-gray-500 text-white rounded hover:shadow-lg p-1"
                  >
                    View Mark Sheet {index + 1}
                  </button>
                  <button
                    type='button'
                    onClick={() => handleMultipleFileDelete('bachelorsMarkSheets', url)}
                    className="bg-red-500 text-white rounded hover:shadow-lg p-1"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default Documents;
