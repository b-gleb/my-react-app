import React from 'react';
import './App.css';

const currentDate = new Date();

function DayButton({ date }){
  return (
    <button className={date > currentDate ? 'day-button' : 'day-button disabled'}>{date.getDate()}</button>
  )
}

function getCurrentWeekDates(today = new Date()) {
  // Create a copy of today's date to avoid modifying the original date
  const startOfWeek = new Date(today);
  
  // Adjust start of week to the most recent Monday
  const dayOfWeek = today.getDay(); // Sunday - Saturday : 0 - 6
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(today.getDate() + diffToMonday);
  
  // Generate array of all dates in this week
  const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
  });
  
  return weekDates;
}


function App() {
    const WeekDates = getCurrentWeekDates();

    

    return (
        <div className="app">
            {/* <header className="top-bar">
                {dateSelected ? `Selected Date: ${dateSelected.toDateString()}` : "Select a Date"}
            </header> */}

            <h1>Select date</h1>

            <div className='calendar-grid'>
              {WeekDates.map(date => 
                <DayButton date={date}/>
              )}
            </div>

          
        </div>
    );
}

export default App;
