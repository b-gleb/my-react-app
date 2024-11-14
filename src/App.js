import React, { useEffect } from 'react';
import './App.css';

function DayButton({ date }) {
  const today = new Date();

  return (
    <button
      className={date > today ? 'day-button' : 'day-button disabled'}
      onClick={
        date > today
        ? () => alert("You selected " + date.toDateString())
        : null
      }
      style={
        date.getDate() === 1 
        ? {gridColumnStart: (date.getDay() + 6) % 7 + 1}
        : {}
      }
    >
      {date.getDate()}
    </button>
  );
}


function getCalendarDates() {
  const today = new Date();
  const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (today.getDay() + 6) % 7);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 27);

  // Create an array of dates between startDate and endDate
  const dates = Array.from({ length: (endDate - startDate) / (1000 * 60 * 60 * 24) + 1 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  // Group the dates by month using reduce
  const monthDates = dates.reduce((acc, date) => {
    const monthName = monthNames[date.getMonth()];
    acc[monthName] = acc[monthName] || [];
    acc[monthName].push(date);
    return acc;
  }, {});

  return monthDates;
}


function App() {
  useEffect(() => {
    // Check if the script is already added to avoid duplicates
    if (!document.getElementById('telegram-web-app-script')) {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.id = 'telegram-web-app-script';
        script.async = true; // Optional: makes script load asynchronously
        document.body.appendChild(script);
    }
}, []); // Empty dependency array means this effect runs only once

    const dates = getCalendarDates();

    return (
        <div className="app">
            {/* <header className="top-bar">
                {dateSelected ? `Selected Date: ${dateSelected.toDateString()}` : "Select a Date"}
            </header> */}

            <h1>График ЛНС</h1>

            {Object.keys(dates).map(month =>
              <div key={month}>
                <p className='month-label'>{month}</p>
                <div className='calendar-grid'>
                  {dates[month].map(day =>
                    <DayButton date={day}/>
                  )}
                </div>
              </div>
            )}


          
        </div>
    );
}

export default App;
