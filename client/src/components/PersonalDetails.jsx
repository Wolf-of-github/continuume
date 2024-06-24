import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const PersonalDetails = ({ data, onChange }) => {
  
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length < 3) {
      try {
        const promises = files.map(file => storeImage(file));
        const urls = await Promise.all(promises);
        onChange({ ...data, imageUrls: [...data.imageUrls, ...urls] });
        setImageUploadError(false);
      } catch (err) {
        setImageUploadError(`${err}`);
      }
    } else {
      setImageUploadError('Cannot upload more than 2 files');
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleRemoveImage = (index) => {
    const updatedUrls = data.imageUrls.filter((_, i) => i !== index);
    onChange({
      ...data,
      imageUrls: updatedUrls,
    });
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
          console.log(`upload is ${progress}% done`);
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

  const handlePdfUpload = async (file, field) => {
    try {
      const url = await storeFile(file);
      onChange({ ...data, [field]: url }); // Update pdfUrl field in formData
      setImageUploadError(false);
    } catch (err) {
      setImageUploadError(`${err}`);
    }
  };

  return (
    <div>
      <h2>Personal Details</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex flex-col flex-1 gap-4">
          <br />
          <div className="flex gap-4">
            <input onChange={(e) => setFiles(Array.from(e.target.files))} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
          {data.imageUrls.length > 0 && data.imageUrls.map((url, index) => (
            <div key={url} className='flex justify-between p-3 border items-center'>
              <img src={url} alt="uploaded img" className='w-40 h-40 object-cover rounded-lg' />
              <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <br />
          <div className="flex gap-4">
            <input onChange={(e) => setPdf1(e.target.files[0])} className='p-3 border border-gray-300 rounded w-full' type="file" id='pdf1' accept='.pdf' />
            <button type='button' onClick={() => handlePdfUpload(pdf1, 'pdf1Url')} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload PDF 1</button>
          </div>
          {data.pdf1Url && <a href={data.pdf1Url} target="_blank" rel="noopener noreferrer">View PDF 1</a>}
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <br />
          <div className="flex gap-4">
            <input onChange={(e) => setPdf2(e.target.files[0])} className='p-3 border border-gray-300 rounded w-full' type="file" id='pdf2' accept='.pdf' />
            <button type='button' onClick={() => handlePdfUpload(pdf2, 'pdf2Url')} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload PDF 2</button>
          </div>
          {data.pdf2Url && <a href={data.pdf2Url} target="_blank" rel="noopener noreferrer">View PDF 2</a>}
        </div>        
        
      </form>
    </div>
  );
};

export default PersonalDetails;
