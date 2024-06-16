// src/components/Sidebar.jsx

import React from 'react';

const Sidebar = ({ onSelect }) => {
  return (
    <aside className="w-64 bg-[#334155] p-4">
      <ul>
        <li className="mb-4 text-[#f1f5f9] cursor-pointer" onClick={() => onSelect('PersonalDetails')}>
          Personal Details
        </li>
        <li className="mb-4 text-[#f1f5f9] cursor-pointer" onClick={() => onSelect('Education')}>
          Education
        </li>
        <li className="text-[#f1f5f9] cursor-pointer" onClick={() => onSelect('TravelAndVisa')}>
          Travel & Visa
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
