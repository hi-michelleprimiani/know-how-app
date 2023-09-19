import React from "react";
import "./ProfileViews.css"; // Assuming you want to use the same styles as your TeacherProfileEvents

export const StudentProfileEvents = ({ events }) => {
  return (
    <div className="student-profile-events-container">
      <h1>Your Signed-Up Events</h1>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="student-signed-up-event">
            <h2>{event.className}</h2> {/* Adjust field name as needed */}
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <button student-delete-button>Remove Registration</button>
          </div>
        ))
      ) : (
        <p>You haven't signed up for any events yet.</p>
      )}
    </div>
  );
};
