import { TeacherProfileButtons } from "./TeacherProfileButtons";
import "./TeacherProfileEvents.css";

export const TeacherProfileEvents = ({
  eventsTaughtByUser,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  const isEventPast = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(eventDate).setHours(0, 0, 0, 0) < today;
  };

  const upcomingEvents = eventsTaughtByUser.filter(
    (event) => !isEventPast(event.date)
  );
  const previousEvents = eventsTaughtByUser.filter((event) =>
    isEventPast(event.date)
  );

  const renderEvents = (eventsArray, emptyMessage) => {
    return eventsArray.length > 0 ? (
      eventsArray.map((event) => {
        const eventDate = new Date(event.date);
        const month = eventDate.getMonth() + 1;
        const day = eventDate.getDate();
        const year = eventDate.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        return (
          <div key={event.id} className="profile-events">
            <div>{event.className}</div>
            <div className="profile-event-details">
              <div>{event.time}</div>
              <div>{formattedDate}</div>
            </div>
            <TeacherProfileButtons
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleView={handleView}
              event={event}
            />
          </div>
        );
      })
    ) : (
      <div>{emptyMessage}</div>
    );
  };

  return (
    <>
      <h2 className="events-title">Your Upcoming Events</h2>
      {renderEvents(upcomingEvents, "You are not teaching any events yet.")}

      <h2 className="events-title">Your Previous Classes</h2>
      {renderEvents(
        previousEvents,
        "You have not taught any classes previously."
      )}
    </>
  );
};
