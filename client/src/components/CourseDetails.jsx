import React from 'react';
import Select from 'react-select';

const CourseDetails = ({ data, onChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onChange({
      ...data,
      interestedInCourses: selectedValues,
    });
  };

  const courseOptions = [
    { label: "IT/CS", value: "IT/CS" },
    { label: "Business", value: "Business" },
    { label: "MBA", value: "MBA" },
    { label: "Commerce", value: "Commerce" },
  ];

  return (
    <div>
      <div className='text-xl font-medium pb-4 text-indigo-500'>Course Details</div>
      <form>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              After what educational level are you flying
            </label>
            <select
              name="flyingAfter"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.flyingAfter || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Value</option>
              <option value="Twelfth">Twelfth</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelors">Bachelors</option>
            </select>
          </div>

          <label className="block text-gray-700 text-sm font-bold mb-2 col-span-2">
            Interested in courses
          </label>

          <div className='col-span-2'>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={courseOptions}
              placeholder='Select courses you are interested in'
              value={courseOptions.filter(option => data.interestedInCourses && data.interestedInCourses.includes(option.value))}
              onChange={handleMultiSelectChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
