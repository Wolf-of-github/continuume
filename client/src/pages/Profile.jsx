import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import Modal from '../components/Modal';
import Toast from '../components/Toast'; // Import your Toast component
import { clearUserToView } from '../redux/form/formSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        showToast('error', data.message); // Show error toast
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      showToast('success', 'User is updated successfully!'); // Show success toast
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      showToast('error', error.message); // Show error toast
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        showToast('error', data.message); // Show error toast
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      showToast('error', error.message); // Show error toast
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        showToast('error', data.message); // Show error toast
        return;
      }
      dispatch(deleteUserSuccess(data));
      dispatch(clearUserToView())
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
      showToast('error', error.message); // Show error toast
    }
  }

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const confirmSignOut = () => {
    setShowSignOutModal(false);
    handleSignOut();
  };

  const confirmDeleteAccount = () => {
    setShowDeleteAccountModal(false);
    handleDeleteUser();
  };

  // Toast state
  const [toasts, setToasts] = useState([]);

  // Function to show toast
  const showToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000);
    setToasts([...toasts, { id, type, message }]);
  };

  // Function to remove toast
  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className='max-w-lg mx-auto'>
      <div className='max-w-lg mx-auto p-6 rounded-lg'>
        <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden'>
          <h1 className='text-3xl font-semibold text-center my-7 text-gray-800'>Profile</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt='profile'
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-4 border-gray-200'
            />
            <p className='text-sm self-center mt-2'>
              {fileUploadError ? (
                <span className='text-red-700'>
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-blue-600'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
                ''
              )}
            </p>
            <input
              type='text'
              placeholder='Name'
              defaultValue={currentUser.fullname}
              id='fullname'
              className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Username'
              defaultValue={currentUser.username}
              id='username'
              className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email'
              id='email'
              defaultValue={currentUser.email}
              className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              onChange={handleChange}
              id='password'
              className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            <button
              disabled={loading}
              className='text-white bg-indigo-500 rounded-lg p-3 uppercase'
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
          </form>
          <div className='flex justify-between mt-5'>
            <span
              onClick={() => setShowDeleteAccountModal(true)}
              className='text-red-700 cursor-pointer hover:text-red-800'
            >
              Delete account
            </span>
            <span onClick={() => setShowSignOutModal(true)} className='text-red-700 cursor-pointer hover:text-red-800'>
              Sign out
            </span>
          </div>

          {/* <p className='text-red-700 mt-5'>{error ? error : ''}</p>
          <p className='text-green-700 mt-5'>
            {updateSuccess ? 'User is updated successfully!' : ''}
          </p> */}

          {/* Sign Out Modal */}
          <Modal
            show={showSignOutModal}
            onClose={() => setShowSignOutModal(false)}
            onConfirm={confirmSignOut}
            title="Confirm Sign Out"
          >
            Are you sure you want to sign out?
          </Modal>

          {/* Delete Account Modal */}
          <Modal
            show={showDeleteAccountModal}
            onClose={() => setShowDeleteAccountModal(false)}
            onConfirm={confirmDeleteAccount}
            title="Confirm Delete Account"
          >
            Are you sure you want to delete your account? This action cannot be undone.
          </Modal>

          {/* Toasts */}
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              onClose={removeToast}
            />
          ))}
          <div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
