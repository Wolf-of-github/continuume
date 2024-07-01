import React from 'react'
import Calendar from '../components/Calendar'

export default function Events() {
  return (
    <div>
        <div className=''>
          <div className='max-w-screen-lg px-4 py-8 sm:px-8'>
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="font-bold text-xl text-gray-700">View Events</h2>
                <span className="text-base text-gray-500">Please follow the events calendar to complete your application on time</span>
              </div>
            </div>
            <Calendar/>
          </div>
        </div>
    </div>
  )
}
