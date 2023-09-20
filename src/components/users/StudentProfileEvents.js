import { useEffect, useState } from "react";
import "./StudentProfileEvents.css";
import { deleteRegistration } from "../../services/RegistrationServices";

export const StudentProfileEvents = ({ currentUser, registrations }) => {
  const [signedUpEvents, setSignedUpEvents] = useState([]);

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

  //ignore squiggles, will cause infinite loop
  useEffect(() => {
    renderSignedUpEvents();
  }, [currentUser.id]);

  const handleDeleteRegistration = (regId) => {
    deleteRegistration(regId).then(() => {
      renderSignedUpEvents();
    });
  };

  return (
    <div className="student-profile-events-container">
      <h1 className="student-events">Your Signed Up Events</h1>
      {signedUpEvents.length > 0 ? (
        signedUpEvents.map((eventObj) => {
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
                className="student-delete"
                onClick={() => handleDeleteRegistration(eventObj.id)}
              >
                Delete Registration
              </button>
            </div>
          );
        })
      ) : (
        <p>You haven't signed up for any events yet.</p>
      )}
    </div>
  );
};
