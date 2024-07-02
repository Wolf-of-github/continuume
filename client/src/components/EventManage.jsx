import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import Select from 'react-select'

export default function EventManage() {

  const initialFormData = {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventVenue: '',
      eventDescription: '',
      eventRegistrationLink: '',
      eventBannerImage: '',
      eventResources: [],
      eventApplicableFor: []
    };

  const initialFilterStates = {
      currentYearOptions: [],
      flightYearOptions: [],
      streamOptions: [],
      specializationOptions: [],
      uniPreferencesOptions: []
    }
    
  const [formData, setFormData] = useState(initialFormData)    

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      
      const res = await fetch("/api/events/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        alert(data.message)
        return;
      }

      alert('event created')
      setFormData(initialFormData);
      setFilterStates(initialFilterStates)

    } catch (error) {
      
      alert(error.message)
    }    
  }


  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // single file controls

  const [eventBannerImageUploading, setEventBannerImageUploading] = useState(false)

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
  
  const handleSingleImageUpload = async (e) =>{
    
    const file = e.target.files[0];
    if (file) {
      try {
      setEventBannerImageUploading(true)
      const url = await storeFile(file);
      setFormData({
        ...formData,
        eventBannerImage: url
      });    
      setEventBannerImageUploading(false)  
      }
      catch(err){
        alert(`Error ${err}`)
      }
    }

  }

  const handleSingleImageDelete = () =>{
    setFormData({
      ...formData,
      eventBannerImage: ''
    });
  }

  //multiple file controls
  const [filesUploading, setFilesUploading] = useState(false)
  const [files, setFiles] = useState([])

  const handleMultiImageUpload = async () =>{
    if (files.length + formData.eventResources.length > 0 && files.length + formData.eventResources.length < 4){
      
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

    }else{
      alert("file count 1-4 only")
    }
  }

  const handleResourceDelete = (indexToDelete) => {
    setFormData(prevState => ({
      ...prevState,
      eventResources: prevState.eventResources.filter((resource, index) => index !== indexToDelete)
    }));
  }

  //filter controls
  const currentYearOptions = [
    { label: "First Year", value: "FY" },
    { label: "Second Year", value: "SE" },
    { label: "Third Year", value: "TE" },
    { label: "Fourth Year", value: "BE" },
    { label: "Graduate", value: "Graduate" }
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

  const [filterStates, setFilterStates] = useState(initialFilterStates)

  const handleMultiSelectChange = (filterType, selectedFilters) => {
    const values = selectedFilters ? selectedFilters.map(filter => filter.value) : [];
    setFilterStates(prevState => ({
      ...prevState,
      [filterType]: values
    }));
  };  

  useEffect(() => {
    const mergedFilters = Object.values(filterStates).flat();
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventApplicableFor: mergedFilters,
    }));    
  }, [filterStates]);
  

  return (
    
    <div className="bg-white overflow-hidden">
      <div className="px-6 py-4">
        
        <div className="flex items-center justify-between pb-3">
          <div>
            <h2 className="font-semibold text-gray-700">Create Events</h2>
            <span className="text-xs text-gray-500">View and manage upcomming events</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-2 gap-4 mb-3">  
            
            {/* event name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Name
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.eventName} 
                onChange={handleChange} 
                name="eventName" 
                placeholder="Enter your event name"
              />
            </div>
            {/* event Date */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Date
              </label>
              <input type='date'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.eventDate} 
                onChange={handleChange} 
                name="eventDate" 
                placeholder="Enter your event date"
              />
            </div>
            {/* event time */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Time
              </label>
              <input type='time'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.eventTime} 
                onChange={handleChange} 
                name="eventTime" 
                placeholder="Enter your event time"
              />
            </div>  
            {/* event venue */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Venue
              </label>
              <input type='text'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.eventVenue} 
                onChange={handleChange} 
                name="eventVenue" 
                placeholder="Enter your event venue"
              />
            </div>            

          </div>
          {/* event description */}
          <div className='mb-2'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Description
              </label>
              <textarea
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.eventDescription} 
                onChange={handleChange} 
                name="eventDescription" 
                placeholder="Enter your event description"
              />
          </div>
          {/* event reg link */}
          <div className='mb-2'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Registration Link
              </label>
              <input type='url'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.eventRegistrationLink} 
                onChange={handleChange} 
                name="eventRegistrationLink" 
                placeholder="Enter your event registration link"
              />
          </div>


          {/* filters */}
          <div className=''>
            
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Applicable for
            </label>

            <div className='mb-2 grid grid-cols-3 gap-4'>

                <div className='col-span-1'>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={currentYearOptions}
                    placeholder = 'Candidates in year'
                    onChange={(selected) => handleMultiSelectChange("currentYearOptions",selected)}
                  />
                </div>

                <div className='col-span-1'>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={flightYearOptions}
                    placeholder = 'Candidates flying in'
                    onChange={(selected) => handleMultiSelectChange("flightYearOptions",selected)}
                  />
                </div>

                <div className='col-span-1'>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={streamOptions}
                    placeholder = 'Candidates with stream'
                    onChange={(selected) => handleMultiSelectChange("streamOptions",selected)}
                  />
                </div>
                
                <div className='col-span-1'>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={specializationOptions}
                    placeholder = 'Candidates with specialization'
                    onChange={(selected) => handleMultiSelectChange("specializationOptions",selected)}
                  />
                </div>

                <div className='col-span-2'>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={uniPreferencesOptions}
                    placeholder = 'Applicable for Universities'
                    onChange={(selected) => handleMultiSelectChange("uniPreferencesOptions",selected)}
                  />
                </div>

            </div>
          </div>


          {/* event banner img */}
          <div className='mb-2'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Banner Image
              </label>
              
              {
                formData.eventBannerImage == '' ? (
                <input type='file' accept='image/*'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
                onChange={handleSingleImageUpload} disabled={eventBannerImageUploading}
                />
                ):(
                  <div className="flex space-x-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>handleSingleImageDelete()}>
                      Delete
                    </button>
                    <a href= {formData.eventBannerImage} target="_blank" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      View
                    </a>
                  </div>
                )
              }
          </div> 

          {/* resources upload */}
          <div className='mb-3'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Resources (One or more)
              </label>
              <div className='grid grid-cols-8 gap-2'>
                
                <input type='file' multiple accept='image/*'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100 col-span-7"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                disabled={filesUploading} />

                <button type = 'button' className='col-span-1 bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleMultiImageUpload()} disabled={filesUploading}>
                  Upload
                </button>

              </div>
              {
                formData.eventResources.length > 0 && (
                  <div>
                  {formData.eventResources.map((resource, index) => (
                    <div key={index} className="flex space-x-4 py-2">
                        <button type='button' className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleResourceDelete(index)}>
                          Delete
                        </button>
                        <a href = {formData.eventResources[index]} target='_blank' className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          View Resource {index + 1}
                        </a>
                    </div>
                  ))}
                  </div>
                )
              }
          </div>


          
          <div className="flex items-center justify-between pt-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
            </div>

        </form>

      </div>
    </div>
  );
}
