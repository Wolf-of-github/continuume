import React, { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';

const PersonalDetails = ({ data, onChange }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      return;
    }

    const storage = getStorage(app);
    const fileName = `${currentUser._id}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error('File upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onChange({
            ...data,
            resumeURL: downloadURL,
          });
          setFileUploadError(false);
        });
      }
    );
  };

  const handleFileDelete = () => {
    const storage = getStorage(app);
    const fileRef = ref(storage, data.resumeURL);

    deleteObject(fileRef).then(() => {
      onChange({
        ...data,
        resumeURL: '',
      });
    }).catch((error) => {
      console.error('File delete error:', error);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
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
        <div>
          <label>Resume (PDF only, max 2MB):</label>
          <input
            type="file"
            ref={fileRef}
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={!!data.resumeURL}
          />
        </div>
        {data.resumeURL && (
          <div>
            <a href={data.resumeURL} target="_blank" rel="noopener noreferrer">View Uploaded Resume</a>
            <br></br>
            <button type="button" onClick={handleFileDelete}>Delete File</button>
          </div>
        )}
        {fileUploadError && <p className="text-red-700">File upload error (PDF must be less than 2MB)</p>}
        {filePerc > 0 && filePerc < 100 && <p className="text-slate-700">Uploading {filePerc}%</p>}
        {filePerc === 100 && !fileUploadError && <p className="text-green-700">File uploaded successfully!</p>}
      </form>
    </div>
  );
};

export default PersonalDetails;
