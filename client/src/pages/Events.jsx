import React, { useState } from 'react';
import Calendar from '../components/Calendar';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event to display details
  };

  const clearSelectedEvent = () => {
    setSelectedEvent(null); // Clear selected event details
  };
  
  const getFormattedDate = (date) => {
    const originalDate = new Date(date);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className="px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-bold text-xl text-gray-700">View Events</h2>
          <span className="text-base text-gray-500">
            Please follow the events calendar to complete your application on time
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <Calendar onEventClick={handleEventClick} />
        </div>
        <div className="col-span-2 overflow-auto">
          {selectedEvent ? (
            
            <div className='rounded-lg p-4 border'>
              { selectedEvent.eventBannerImage && (
                <div className="mb-4">
                  <img src={selectedEvent.eventBannerImage} alt="Event Banner" className="w-full h-48 object-contain rounded-lg" />
                </div>
                )
              }

              <div className="grid grid-cols-2 gap-4">

                {/* Event name */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Event Name
                  </label>
                  <div className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {selectedEvent.eventName} 
                  </div>
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Event Date
                  </label>
                  <div className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {getFormattedDate(selectedEvent.eventDate)} 
                  </div>
                </div>

                {/* Event Time */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Event Time
                  </label>
                  <div className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {selectedEvent.eventTime}
                  </div>
                </div>

                {/* Event Venue */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Event Venue
                  </label>
                  <div className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {selectedEvent.eventVenue}
                  </div>
                </div>

              </div>

              {/* Event Description */}
              <div className='mb-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Event Description
                </label>
                <div className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  {selectedEvent.eventDescription}
                </div>
              </div>

              {/* Registration Link */}
              <div className='mb-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration Link
                </label>
                <div className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <a href={selectedEvent.eventRegistrationLink} target='_blank' rel="noopener noreferrer">{selectedEvent.eventRegistrationLink}</a>
                </div>
              </div>

              {/* Event Resources */}
              <div className=''>
                {selectedEvent.eventResources.length > 0 && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Event Resources
                    </label>
                    {selectedEvent.eventResources.map((resource, index) => (
                      <div key={index} className="flex space-x-4 py-2">
                        <a href={resource} target='_blank' rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          View Resource {index + 1}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className='h-screen rounded-lg border p-4 pb-0 text-center flex items-center justify-center'>
              Select an event to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
