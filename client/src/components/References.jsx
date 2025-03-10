import React, { useState } from 'react';
import { BSON } from "realm-web";
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const References = ({ data, onChange }) => {
  const [references, setReferences] = useState(data);

  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
        referenceName: '',
        referencePosition: '',
        referenceTitle: '',
        referenceWorkEmail: '',
        referenceKnowDuration: '',
        referencePhone: '',
        referenceRelationship: '',
        referenceInstitution: '',
        referenceInstitutionAdd: '',
        fileUrl: ''
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedReferences = [...references];
    updatedReferences[index] = { ...updatedReferences[index], [name]: value };
    setReferences(updatedReferences);
    onChange(updatedReferences);
  };

  const handleRemoveReference = (index) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    setReferences(updatedReferences);
    onChange(updatedReferences);
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
      const updatedReferences = [...references];
      updatedReferences[index].fileUrl = downloadURL;
      setReferences(updatedReferences);
      onChange(updatedReferences);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = (index) => {
    const updatedReferences = [...references];
    updatedReferences[index].fileUrl = ''; // Remove file URL
    setReferences(updatedReferences);
    onChange(updatedReferences);
  };

  return (
    <div>
      <div className='text-xl font-medium pb-4 text-indigo-500'>References</div>
      <form>
        {references.map((reference, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type='text'
                  name='referenceName'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference name'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Position
                </label>
                <input
                  type='text'
                  name='referencePosition'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referencePosition}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference position'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type='text'
                  name='referenceTitle'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceTitle}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference title'
                />
              </div>


              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Work Email
                </label>
                <input
                  type='email'
                  name='referenceWorkEmail'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceWorkEmail}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference work email'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Duration Known
                </label>
                <input
                  type='text'
                  name='referenceKnowDuration'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceKnowDuration}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter duration known'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type='text'
                  name='referencePhone'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referencePhone}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference phone'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Relationship
                </label>
                <input
                  type='text'
                  name='referenceRelationship'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceRelationship}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter relationship'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Institution
                </label>
                <input
                  type='text'
                  name='referenceInstitution'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceInstitution}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter institution'
                />
              </div>

              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Institution Address
                </label>
                <input
                  type='text'
                  name='referenceInstitutionAdd'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceInstitutionAdd}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter institution address'
                />
              </div>

              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Document
                </label>
                {!reference.fileUrl && (
                  <input
                    type='file'
                    accept='application/pdf,image/*'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-indigo-500
                  hover:file:bg-violet-100"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileUpload(index, e.target.files[0]);
                      }
                    }}
                  />
                )}
                {reference.fileUrl && (
                  <div className='mt-2 flex items-center'>
                    <button
                      type='button'
                      className=" px-4 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleFileDelete(index)}
                    >
                      Delete File
                    </button>
                    <button
                      type='button'
                      className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                      onClick={() => window.open(reference.fileUrl, '_blank', 'noopener,noreferrer')}
                    >
                      View File
                    </button>

                  </div>
                )}
              </div>
            
            </div>

            <div className="flex justify-end pt-4">
              <button
                type='button'
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleRemoveReference(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-center">
          <button
            type='button'
            className="mt-4 p-3 bg-blue-500 text-white rounded-md"
            onClick={handleAddReference}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default References;
