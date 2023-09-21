import { useEffect, useState } from "react";
import "./StudentProfileEvents.css";
import { deleteRegistration } from "../../services/RegistrationServices";
import { StudentPreviousEvents } from "./StudentPreviousEvents";
import { useNavigate } from "react-router-dom";

export const StudentProfileEvents = ({ currentUser }) => {
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const navigate = useNavigate();
  const handleView = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  //ignore squiggles, will cause infinite loop
  useEffect(() => {
    renderSignedUpEvents();
  }, [currentUser.id]);

  const renderSignedUpEvents = () => {
    if (!currentUser.isStaff) {
      fetch(
        `http://localhost:8088/registrations?userId=${currentUser.id}&_expand=event&_expand=user`
      )
        .then((res) => res.json())
        .then((registrations) => {
          setSignedUpEvents(registrations);
        });
    }
  };

  const handleDeleteRegistration = (regId) => {
    deleteRegistration(regId).then(() => {
      renderSignedUpEvents();
    });
  };

  const isEventPast = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(eventDate).setHours(0, 0, 0, 0) < today;
  };

  const upcomingEvents = signedUpEvents.filter(
    (eventObj) => !isEventPast(eventObj.event.date)
  );
  const pastEvents = signedUpEvents.filter((eventObj) =>
    isEventPast(eventObj.event.date)
  );

  return (
    <div className="student-profile-events-container">
      <h1 className="student-events">Your Signed Up Events</h1>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((eventObj) => {
          return (
            <div key={eventObj.id} className="student-signed-up-event">
              <h2>{eventObj.event.className}</h2>
              <div className="student-event-details">
                <p>Date: {eventObj.event.date}</p>
                <p>Time: {eventObj.event.time}</p>
                <p>Location: {eventObj.event.location}</p>
                <p>Fee: {eventObj.event.fee}</p>
              </div>
              <button
                className="profile-view-button"
                onClick={() => handleView(eventObj.event.id)}
              >
                View
              </button>
              <button
                className="student-delete"
                onClick={() => handleDeleteRegistration(eventObj.id)}
              >
                Delete Registration
              </button>
            </div>
          );
        })
      ) : (
        <p className="signed-up">You haven't signed up for any events yet.</p>
      )}
      <StudentPreviousEvents signedUpEvents={pastEvents} />
    </div>
  );
};
