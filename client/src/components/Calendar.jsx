import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ onEventClick }) => {
  const [events, setEvents] = useState([]);

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

  const getFormattedDate = (date) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear().toString();
    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    const day = ('0' + originalDate.getDate()).slice(-2);
    const formattedDateISO = `${year}-${month}-${day}`;
    return formattedDateISO;
  };

  const formatEventsForCalendar = () => {
    return events.map((event) => ({
      title: event.eventName,
      date: getFormattedDate(event.eventDate),
      ...event, // Include all event details for easier access on click
    }));
  };

  const handleEventClick = (info) => {
    // Pass the clicked event details to the parent component
    onEventClick(info.event.extendedProps);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      events={formatEventsForCalendar()}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
