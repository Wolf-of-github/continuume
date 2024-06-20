import React from 'react';

const TravelAndVisa = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Travel & Visa</h2>
      <form>
        {/* Form fields for travel and visa */}
        <div>
          <label>Passport Number:</label>
          <input type="text" name="passpostNumber" value={data.passpostNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label>Visa Type:</label>
          <input type="text" name="visaType" value={data.visaType} onChange={handleInputChange} />
        </div>
        {/* Add more fields as needed */}
      </form>
    </div>
  );
};

export default TravelAndVisa;
