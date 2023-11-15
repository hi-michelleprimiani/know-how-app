import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/APIService";
import { CalendarLeftAndRightBtn } from "./CalendarLeftAndRightBtn";
import { CalendarDaysData } from "./CalendarDaysData";
import { PostNewEventButton } from "./PostNewEventButton";
import "./Calendar.css";
import { getEvents } from "../../services/EventsService";
import { CategoryFilter } from "./CategoryFilter";

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

export const CalendarComponent = ({ currentUser }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [users, setUsers] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // checks if user is an array 
    if (Array.isArray(users)) {
      // fetches array of events with promise handler 
      getEvents().then((eventsArray) => {
        // reduce method to transform array of events into an object where key dates and values are arrays. acc / accumulator
        const eventsByDate = eventsArray.reduce((acc, event) => {
          const correspondingTeacher = users.find(
            (user) => user.id === event.teacherId
          );
          const teacherName = correspondingTeacher
            ? correspondingTeacher.name
            : "Unknown";

          // Adjust the date for timezone
          let eventDate = new Date(event.date);
          eventDate.setMinutes(
            eventDate.getMinutes() + eventDate.getTimezoneOffset()
          );
          const dateStr = eventDate.toDateString();
          // checks if the 'acc' obj has a key for the events date.
          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }

          acc[dateStr].push({
            ...event,
            teacherName,
          });
          return acc;
        }, {});
        setEvents(eventsByDate);
      });
    }
  }, [users]);

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

  // condition ? expressionIfTrue : expressionIfFalse.
  const handleNextClick = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const filteredEvents = selectedCategory
    ? Object.fromEntries(
        Object.entries(events).map(([date, eventArray]) => [
          date,
          eventArray.filter(
            (event) => event.categoryId === parseInt(selectedCategory)
          ),
        ])
      )
    : events;

  const filterEventsBySearch = (events, searchQuery) => {
    return Object.fromEntries(
      Object.entries(events).map(([date, eventArray]) => [
        date,
        eventArray.filter((event) =>
          event.className.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ])
    );
  };

  const searchedEvents = filterEventsBySearch(filteredEvents, searchQuery);

  return (
    <>
      <div className="calendar">
        <div className="header">
          <div className="month">{`${months[currentMonth]} `}</div>
          {currentUser.isStaff ? (
            <>
              <PostNewEventButton />
            </>
          ) : (
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          <input
            type="text"
            placeholder="Search Events"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            nextDays={nextDays}
            events={searchedEvents}
          />
        </div>
      </div>
    </>
  );
};
