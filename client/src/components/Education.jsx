// src/components/Education.jsx

import React from 'react';

const Education = () => {
  return (
    <div>
      <h2>Education</h2>
      <form>
        {/* Form fields for education */}
        <div>
          <label>School:</label>
          <input type="text" name="school" />
        </div>
        <div>
          <label>Degree:</label>
          <input type="text" name="degree" />
        </div>
        {/* Add more fields as needed */}
      </form>
    </div>
  );
};

export default Education;
