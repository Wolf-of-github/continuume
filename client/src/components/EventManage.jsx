import { useEffect, useState } from 'react';
import EventsForm from './EventsForm';


const EventManage = () => {
  
  const [events, setEvents] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false)

  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events/read');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);

    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvent = async (id) =>{
    
    try{
      const response = await fetch(`/api/events/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchEvents()   
    }
    catch(error){
      console.error('Error fetching events:', error);
    }
  }
  const handleAddEvents = () => {
      setShowUploadForm(!showUploadForm)
  };
  
  const handleFormUploadSuccess = () => {
    setShowUploadForm(false);
    fetchEvents();
  };  

  const getDateFormatted = (date) => {
    const originalDate = new Date(date);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Manage Events</h2>
            <span className="text-xs text-gray-500">View upcomming events or create new</span>
          </div>
          <button onClick={handleAddEvents} className="text-sm  font-semibold bg-green-200 text-green-900 hover:bg-green-400 py-2 px-4 rounded">
            Add New Event
          </button>          
        </div>
        { 
        showUploadForm && <EventsForm onUploadSuccess={handleFormUploadSuccess} />
        }
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Event Name</th>
                  <th className="px-5 py-3">Event Date</th>
                  <th className="px-5 py-3">Event Time</th>
                  <th className="px-5 py-3">Event Venue</th>
                  <th className="px-5 py-3">Event Description</th>
                  <th className="px-5 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {events.map(event => (
                  <tr key = {event._id}>
                    
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{event.eventName}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{getDateFormatted(event.eventDate)}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm max-w-48">
                      <p className="whitespace-pre-wrap">{event.eventTime}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm max-w-48">
                      <p className="whitespace-pre-wrap">{event.eventVenue}</p>
                    </td>
                    
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm max-w-48">
                      <p className="whitespace-pre-wrap">{event.eventDescription}</p>
                    </td>

                    <td className = "border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      
                      <button className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-900" onClick={()=>deleteEvent(event._id)}>
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm"> Showing {events.length} Entries </span>
            <div className="mt-2 inline-flex sm:mt-0">
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default EventManage;
