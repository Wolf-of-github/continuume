/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@fullcalendar/core'),
    require('@fullcalendar/daygrid'),
    require('@fullcalendar/core'),
    require('@fullcalendar/interaction'),
  ],
}