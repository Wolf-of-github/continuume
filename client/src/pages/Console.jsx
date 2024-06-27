import React from 'react'
import Users from '../components/Users'
import ResourceEdit from '../components/ResourceEdit'
import { useSelector } from 'react-redux';


export default function Console() {
  
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="grid grid-cols-1 h-screen">
      <div className="flex-1">
        <Users />
      </div>
      <div className="flex-1">
        <ResourceEdit />
      </div>
      {/* Add more rows as needed */}
    </div>
  )
}
