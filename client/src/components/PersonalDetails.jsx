// src/components/PersonalDetails.jsx

import React from 'react';

const PersonalDetails = () => {
  return (
    <div>
      <h2>Personal Details</h2>
      <form>
        {/* Form fields for personal details */}
        <div>
          <label>Name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        {/* Add more fields as needed */}
      </form>
    </div>
  );
};

export default PersonalDetails;
