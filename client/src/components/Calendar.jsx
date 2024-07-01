import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const loadEvents = () => {
    return [
      { title: 'Event 1', date: '2024-06-28' },
      { title: 'Event 2', date: '2024-06-29' },
    ];
  }

  const handleDateClick = (info) => {
    console.log('Date clicked:', info.dateStr);
  }

  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event);
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      events={loadEvents()}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
