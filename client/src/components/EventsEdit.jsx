import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'

export default function EventsEdit() {
  
  const [formData, setFormData] = useState({
    eventName: '', 
    eventDate: '',
    eventTime: '', 
    eventVenue: '', 
    eventRegistrationLink: '', 
    eventBannerImage: '', 
    eventDescription: '',
    eventApplicableFor: [],
    eventResources: []
  });

  const [selectedOptions, setSelectedOptions] = useState({
    currentYear: [],
    flightYear: [],
    stream: [],
    specialization: [],
    uniPreferences: []
  });
  
  const currentYearOptions = [
    { label: "First Year", value: "first_year" },
    { label: "Second Year", value: "second_year" },
    { label: "Third Year", value: "third_year" },
    { label: "Fourth Year", value: "fourth_year" }
  ];

  const flightYearOptions = [
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" }
  ];

  const streamOptions = [
    { label: "Science", value: "science" },
    { label: "Commerce", value: "commerce" },
    { label: "Arts", value: "arts" }
  ];

  const specializationOptions = [
    { label: "Computer Science", value: "computer_science" },
    { label: "Mechanical Engineering", value: "mechanical_engineering" },
    { label: "Civil Engineering", value: "civil_engineering" },
    { label: "Electrical Engineering", value: "electrical_engineering" }
  ];

  const uniPreferencesOptions = [
    { label: "Harvard", value: "harvard" },
    { label: "MIT", value: "mit" },
    { label: "Stanford", value: "stanford" },
    { label: "Caltech", value: "caltech" }
  ];

  useEffect(() => {
    
    const eventResources = [
      ...selectedOptions.currentYear,
      ...selectedOptions.flightYear,
      ...selectedOptions.stream,
      ...selectedOptions.specialization,
      ...selectedOptions.uniPreferences
    ];

    // Update formData with the new eventResources array
    setFormData(prevFormData => ({
      ...prevFormData,
      eventResources: eventResources
    }));
  }, [selectedOptions]); 

  const handleMultiSelectChange = (fieldName, selectedOptions) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [fieldName]: selectedOptions
    }));
  };

  const [bannerImageUploading, setBannerImageUploading] = useState(false)
  const [filesUploading, setFilesUploading] = useState(false)
  const [files, setFiles] = useState([])

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

  const handleImageSubmit = async (e) => {
    
    const file = e.target.files[0];
    if (file) {
      try {
      setBannerImageUploading(true)
      const url = await storeFile(file);
      setFormData({
        ...formData,
        eventBannerImage: url
      });    
      setBannerImageUploading(false)  
      }
      catch(err){
        alert(`Error ${err}`)
      }
    }
  };

  const handleBannerImageDelete = () =>{
    setFormData({
      ...formData,
      eventBannerImage: ""
    });
  }

  const handleFileChange = async (e) => {  
    
    if (files){         

      if (formData.eventResources.length + files.length > 0 && formData.eventResources.length + files.length < 5) {
        
        try {
          setFilesUploading(true)
          const promises = files.map(file => storeFile(file));
          const urls = await Promise.all(promises);

          setFormData({
            ...formData,
            eventResources: [...formData.eventResources, ...urls]
          });  

          setFilesUploading(false)
          setFiles([])
          
        } catch (err) {
          alert(`${err}`);
        }
      } 
      else {
        alert('Cannot upload more than 2 files');
      }
    }
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleResourceDelete = (indexToDelete) => {
    setFormData(prevState => ({
      ...prevState,
      eventResources: prevState.eventResources.filter((resource, index) => index !== indexToDelete)
    }));
  };

  return (
    <div className=''>

      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h2 className="font-semibold text-gray-700">Create Events</h2>
          <span className="text-xs text-gray-500">View and manage upcomming events</span>
        </div>
      </div>

      <form className="w-full px-6 py-6 mx-auto" onSubmit={handleSubmit}>
        
        <div className="relative z-0 w-full mb-5 group">
            
            <input type="text"  value={formData.eventName} onChange={handleChange} name="eventName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Name</label>

        </div>

        <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={formData.eventDescription} onChange={handleChange} name="eventDescription"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Description</label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="date" value={formData.eventDate} onChange={handleChange} name="eventDate"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="time" value={formData.eventTime} onChange={handleChange} name="eventTime"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={formData.eventVenue} onChange={handleChange} name="eventVenue"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Venue</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={formData.eventRegistrationLink} onChange={handleChange} name="eventRegistrationLink"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registration Link</label>
          </div>
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
          {
            formData.eventBannerImage != '' ? (
              <div>
                <div className='py-3'>
                  <button type='button' onClick={() => handleBannerImageDelete()} className=" text-red-700 border border-red-700 rounded  hover:shadow-lg p-1 mr-2">
                    Delete
                  </button>
                  <button className=" text-lime-500	 border border-lime-500 rounded  hover:shadow-lg p-1">
                    View Image
                  </button>
                </div>
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Upload Event Banner Image
                </label>                  
              </div>              
            ) : (
              <div>
                <input
                  type="file"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept="image/*"
                  onChange={handleImageSubmit}
                  disabled={bannerImageUploading}
                />
                        
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Upload Event Banner Image
                </label>                
              </div>              
            )
          }
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <div className="flex items-center">
              <input
                type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                accept="image/*"
                disabled={filesUploading}
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 text-blue-500 rounded hover:shadow-lg border border-blue-500"
                onClick={handleFileChange}
                disabled={filesUploading}
              >
                Upload
              </button>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Upload Event Resources (One or more)
              </label>
              
            </div>
            {formData.eventResources.length >= 1 && 
              <div>
                {formData.eventResources.map((resource, index) => (
                  <div key={index} className='py-3'>
                    <button type='button' onClick={() => handleResourceDelete(index)} className="text-red-700 border border-red-700 rounded hover:shadow-lg p-1 mr-2">
                      Delete
                    </button>
                    <button className="text-lime-500 border border-lime-500 rounded hover:shadow-lg p-1">
                      View Resource {index + 1}
                    </button>
                  </div>
                ))}

              </div>
            }          
        </div>

        <div className='grid grid-cols-2 gap-2 pb-3'>
      <div className=''>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={currentYearOptions}
          value={selectedOptions.currentYear}
          onChange={(selected) => handleMultiSelectChange('currentYear', selected)}
        />
      </div>

      <div className=''>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={flightYearOptions}
          value={selectedOptions.flightYear}
          onChange={(selected) => handleMultiSelectChange('flightYear', selected)}
        />
      </div>

      <div className=''>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={streamOptions}
          value={selectedOptions.stream}
          onChange={(selected) => handleMultiSelectChange('stream', selected)}
        />
      </div>

      <div className=''>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={specializationOptions}
          value={selectedOptions.specialization}
          onChange={(selected) => handleMultiSelectChange('specialization', selected)}
        />
      </div>

      <div className=''>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={uniPreferencesOptions}
          value={selectedOptions.uniPreferences}
          onChange={(selected) => handleMultiSelectChange('uniPreferences', selected)}
        />
      </div>
    </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>

    </div>
  )
}
