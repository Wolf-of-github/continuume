// PersonalDetails.jsx
import React from 'react';

const PersonalDetails = ({ data, onChange }) => {
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
          <input type="text" name="name" value={data.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={data.email} onChange={handleInputChange} />
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
