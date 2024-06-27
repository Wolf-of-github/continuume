import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        // Example events, replace with your own data fetching logic
        { title: 'Event 1', date: '2024-06-28' },
        { title: 'Event 2', date: '2024-06-29' },
      ]}
    />
  );
};

export default Calendar;
