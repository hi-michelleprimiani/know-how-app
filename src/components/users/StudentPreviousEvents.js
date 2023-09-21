import { useNavigate } from "react-router-dom";
import "./StudentPreviousEvents.css";

export const StudentPreviousEvents = ({ signedUpEvents }) => {
  const navigate = useNavigate();
  const handleView = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="student-previous-events-container">
      <h1 className="previous-title">Your Previous Events</h1>
      {signedUpEvents.length > 0 ? (
        signedUpEvents.map((eventObj) => (
          <div key={eventObj.id} className="student-previous-event">
            <h2>{eventObj.event.className}</h2>
            <div className="student-event-details">
              <p>Date: {eventObj.event.date}</p>
              <p>Location: {eventObj.event.location}</p>
            </div>
            <button
              className="profile-view-button"
              onClick={() => handleView(eventObj.event.id)}
            >
              View
            </button>
          </div>
        ))
      ) : (
        <p className="previous-events">
          You haven't attended any previous events yet.
        </p>
      )}
    </div>
  );
};
