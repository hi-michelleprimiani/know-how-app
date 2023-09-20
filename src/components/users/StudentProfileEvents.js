import React from "react";
import "./StudentProfileEvents.css";

export const StudentProfileEvents = ({ events }) => {
  return (
    <div className="student-profile-events-container">
      <h1 className="student-events">Your Signed Up Events</h1>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="student-signed-up-event">
            <h2>{event.className}</h2>
            <div className="student-event-details">
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Fee: {event.fee}</p>
            </div>
            <button>Delete Registration</button>
          </div>
        ))
      ) : (
        <p>You haven't signed up for any events yet.</p>
      )}
    </div>
  );
};
