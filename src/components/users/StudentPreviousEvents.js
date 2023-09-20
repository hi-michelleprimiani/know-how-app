import "./StudentPreviousEvents.css";

export const StudentPreviousEvents = ({ signedUpEvents }) => {
  const isEventPast = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(eventDate).setHours(0, 0, 0, 0) < today;
  };

  const pastEvents = signedUpEvents.filter((eventObj) =>
    isEventPast(eventObj.event.date)
  );

  return (
    <div className="student-previous-events-container">
      <h1 className="previous-title">Your Previous Events</h1>
      {pastEvents.length > 0 ? (
        pastEvents.map((eventObj) => (
          <div key={eventObj.id} className="student-previous-event">
            <h2>{eventObj.event.className}</h2>
            <div className="student-event-details">
              <p>Date: {eventObj.event.date}</p>
              <p>Time: {eventObj.event.time}</p>
              <p>Location: {eventObj.event.location}</p>
              <p>Fee: {eventObj.event.fee}</p>
            </div>
          </div>
        ))
      ) : (
        <p>You haven't attended any previous events yet.</p>
      )}
    </div>
  );
};
