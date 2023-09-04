import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

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

export const CalendarComp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  const event1 = {
    id: 1,
    name: "Sauerkraut Making Class",
    objective:
      "Learn the art of making delicious and healthy sauerkraut at home. Discover the fermentation process and how to create your own flavorful variations.",
    teacher: "Alice Smith",
    about_teacher:
      "Alice is a fermentation enthusiast with years of experience in crafting probiotic-rich foods. She is passionate about sharing her knowledge and empowering others to embrace fermentation.",
    included: "Ingredients, tools, and jars for fermenting.",
    to_bring: "An apron and a cutting board.",
    price: "$15",
    location: "home",
    date: "09/02/2023",
  };

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
          <div className="btns">
            <div className="btn prev" onClick={handlePrevClick}>
              <FontAwesomeIcon icon={faCircleLeft} />
            </div>
            <div className="btn next" onClick={handleNextClick}>
              <FontAwesomeIcon icon={faCircleRight} />
            </div>
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
          {/*Rendering previous month at the beginning of the calendar display*/}
          {Array.from({ length: firstDay.getDay() }).map((_, index) => (
            <div className="day prev" key={`prev-${index}`}>
              {prevLastDayDate - firstDay.getDay() + index + 1}
            </div>
          ))}
          {Array.from({ length: lastDayDate }).map((_, index) => {
            const dayNumber = index + 1;
            const currentDate = new Date(currentYear, currentMonth, dayNumber);
            const eventDate = new Date(event1.date);

            return (
              <div
                className={`day${
                  dayNumber === new Date().getDate() &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()
                    ? " today"
                    : ""
                }`}
                key={`current-${index}`}
              >
                {dayNumber}
                {currentDate.toDateString() === eventDate.toDateString() && (
                  <div className="event-details">
                    <h3>{event1.name}</h3>
                    <p>{event1.teacher}</p>
                    {/* add more event details as needed */}
                  </div>
                )}
              </div>
            );
          })}
          {Array.from({ length: nextDays }).map((_, index) => (
            <div className="day next" key={`next-${index}`}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
