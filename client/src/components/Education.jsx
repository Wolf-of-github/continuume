import React from 'react';

const Education = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Education</h2>
      <form>
        {/* Form fields for education */}
        <div>
          <label>School:</label>
          <input type="text" name="school" value={data.school} onChange={handleInputChange} />
        </div>
        <div>
          <label>Degree:</label>
          <input type="text" name="degree" value={data.degree} onChange={handleInputChange} />
        </div>
        {/* Add more fields as needed */}
      </form>
    </div>
  );
};

export default Education;
