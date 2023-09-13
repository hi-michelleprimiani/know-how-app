import { Link } from "react-router-dom";

export const CalendarDaysData = ({
  prevLastDayDate,
  firstDay,
  lastDayDate,
  currentYear,
  currentMonth,
  events,
  nextDays,
}) => {
  return (
    <>
      {/*Rendering previous month at the beginning of the calendar display*/}
      {Array.from({ length: firstDay.getDay() }).map((_, index) => (
        <div className="day prev" key={`prev-${index}`}>
          {prevLastDayDate - firstDay.getDay() + index + 1}
        </div>
      ))}

      {Array.from({ length: lastDayDate }).map((_, index) => {
        const dayNumber = index + 1;
        const currentDate = new Date(
          currentYear,
          currentMonth,
          dayNumber
        ).toDateString();

        return (
          <div
            className={`day${
              dayNumber === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? " today"
                : ""
            }`}
            key={dayNumber}
          >
            {dayNumber}
            {events[currentDate] && (
              <Link
                to={`/events/${events[currentDate].id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="event-details">
                  <h3>{events[currentDate].className}</h3>
                  <p>{events[currentDate].teacherName}</p>
                </div>
              </Link>
            )}
          </div>
        );
      })}
      {Array.from({ length: nextDays }).map((_, index) => (
        <div className="day next" key={`next-${index}`}>
          {index + 1}
        </div>
      ))}
    </>
  );
};
