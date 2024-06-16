// src/components/TravelAndVisa.jsx

import React from 'react';

const TravelAndVisa = () => {
  return (
    <div>
      <h2>Travel & Visa</h2>
      <form>
        {/* Form fields for travel and visa */}
        <div>
          <label>Passport Number:</label>
          <input type="text" name="passportNumber" />
        </div>
        <div>
          <label>Visa Type:</label>
          <input type="text" name="visaType" />
        </div>
        {/* Add more fields as needed */}
      </form>
    </div>
  );
};

export default TravelAndVisa;
