import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const PersonalDetails = ({ data, onChange }) => {
  
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [isPdf1Uploading, setIsPdf1Uploading] = useState(false);
  const [isPdf2Uploading, setIsPdf2Uploading] = useState(false);
  const [pdf2InputDisabled, setPdf2InputDisabled] = useState(false); // State to disable/enable PDF 2 input

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

  const storeFile = async (file, field) => {
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
      if (field === 'pdf2Url') {
        setIsPdf2Uploading(true);
        setPdf2InputDisabled(true); // Disable PDF 2 input during upload
      } else {
        setIsPdf1Uploading(true);
      }
      const url = await storeFile(file);
      onChange({ ...data, [field]: url });
      setImageUploadError(false);
    } catch (err) {
      setImageUploadError(`${err}`);
    } finally {
      if (field === 'pdf2Url') {
        setIsPdf2Uploading(false);
        setPdf2InputDisabled(false); // Enable PDF 2 input after upload completes
      } else {
        setIsPdf1Uploading(false);
      }
    }
  };

  const handlePdfDelete = (field) => {
    if (field === 'pdf1Url') {
      try {
        setIsPdf1Uploading(true); // Disable delete button
        onChange({ ...data, pdf1Url: null });
      } finally {
        setIsPdf1Uploading(false); // Enable delete button
      }
    } else if (field === 'pdf2Url') {
      try {
        setIsPdf2Uploading(true); // Disable delete button
        onChange({ ...data, pdf2Url: null });
      } finally {
        setIsPdf2Uploading(false); // Enable delete button
      }
    }
  };

  const handlePdf2Change = (e) => {
    const file = e.target.files[0];
    setPdf2(file);
    if (file) {
      handlePdfUpload(file, 'pdf2Url');
    }
  };
  
  return (
    <div className="">
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
        <br />
      
        <div className="flex flex-col flex-1 gap-4">
          {
            data.pdf1Url ? (
              <div>
                <button type='button' onClick={() => handlePdfDelete('pdf1Url')} className={`p-3 text-red-700 border border-red-700 rounded uppercase hover:shadow-lg ${isPdf1Uploading ? 'disabled:opacity-80 cursor-not-allowed' : ''}`} disabled={isPdf1Uploading}>
                  {isPdf1Uploading ? 'Uploading...' : 'Delete PDF 1'}
                </button>
                <a href={data.pdf1Url} target="_blank" rel="noopener noreferrer">View PDF 1</a>
              </div>
            ) : (
              <div className="flex gap-4">
                <input onChange={(e) => setPdf1(e.target.files[0])} className='p-3 border border-gray-300 rounded w-full' type="file" id='pdf1' accept='.pdf' />
                <button type='button' onClick={() => handlePdfUpload(pdf1, 'pdf1Url')} className={`p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg ${isPdf1Uploading ? 'disabled:opacity-80 cursor-not-allowed' : ''}`} disabled={isPdf1Uploading}>
                  {isPdf1Uploading ? 'Uploading...' : 'Upload PDF 1'}
                </button>
              </div>
            )
          }
          {
            data.pdf2Url ? (
              <div>
                <button type='button' onClick={() => handlePdfDelete('pdf2Url')} className={`p-3 text-red-700 border border-red-700 rounded uppercase hover:shadow-lg ${isPdf2Uploading ? 'disabled:opacity-80 cursor-not-allowed' : ''}`} disabled={isPdf2Uploading}>
                  {isPdf2Uploading ? 'Uploading...' : 'Delete PDF 2'}
                </button>
                <a href={data.pdf2Url} target="_blank" rel="noopener noreferrer">View PDF 2</a>
              </div>
            ) : (
              <div className="flex gap-4">
                <input onChange={handlePdf2Change} disabled={pdf2InputDisabled} className='p-3 border border-gray-300 rounded w-full' type="file" id='pdf2' accept='.pdf' />
              </div>
            )
          }
        </div>

        <div>hey</div>
        <br />
        <div>hey</div>
        <br />
        <div>hey</div>
        <br />
        <div>hey</div>
        <br />
        <div>hey</div>
        <br />
        <div>hey</div>
        <br />        
      </form>
    </div>
  );
};

export default PersonalDetails;
