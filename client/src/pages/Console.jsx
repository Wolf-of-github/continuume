import React from 'react'
import Users from '../components/Users'
import { useSelector } from 'react-redux';


export default function Console() {
  
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="grid grid-rows-3 grid-cols-3 grid-flow-col h-screen">
        <div className="row-span-3 col-span-2">
          <Users/>
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  )
}
