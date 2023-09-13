import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, getUsers } from "../../services/APIService";
import { CalendarLeftAndRightBtn } from "./CalendarLeftAndRightBtn";
import { CalendarDaysData } from "./CalendarDaysData";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CalendarComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [users, setUsers] = useState({});

  const navigate = useNavigate();

  /* Fetches an array of events, matches each event with corresponding teacher using their 'id', 
  formats the data to group events by date */
  useEffect(() => {
    if (Array.isArray(users)) {
      // Check if users is an array
      getEvents().then((eventsArray) => {
        const eventsByDate = eventsArray.reduce((acc, event) => {
          const correspondingTeacher = users.find(
            (user) => user.id === event.teacherId
          );
          const teacherName = correspondingTeacher
            ? correspondingTeacher.name
            : "Unknown";

          acc[new Date(event.date).toDateString()] = {
            ...event,
            teacherName,
          };
          return acc;
        }, {});
        setEvents(eventsByDate);
      });
    }
  }, [users]);

  /* Get Users*/
  useEffect(() => {
    getUsers().then((userArray) => {
      setUsers(userArray);
    });
  }, []);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  const handlePrevClick = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextClick = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  return (
    <>
      <div className="calendar">
        <div className="header">
          <div className="month">{`${months[currentMonth]} ${currentYear}`}</div>
          <button
            className="post-event-button"
            onClick={() => navigate("/PostNewEvent")}
          >
            Post New Event
          </button>
          <div className="btns">
            <CalendarLeftAndRightBtn
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
            />
          </div>
        </div>
        <div className="weekdays">
          {days.map((day) => (
            <div className="day" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          <CalendarDaysData
            prevLastDayDate={prevLastDayDate}
            firstDay={firstDay}
            lastDayDate={lastDayDate}
            currentYear={currentYear}
            currentMonth={currentMonth}
            events={events}
            nextDays={nextDays}
          />
        </div>
      </div>
    </>
  );
};
