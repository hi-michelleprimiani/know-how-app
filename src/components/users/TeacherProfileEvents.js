import { TeacherPreviousEvents } from "./TeacherPreviousEvents";
import { TeacherProfileButtons } from "./TeacherProfileButtons";
import "./TeacherProfileEvents.css";

export const TeacherProfileEvents = ({
  eventsTaughtByUser,
  handleDelete,
  handleEdit,
  handleView,
}) => {
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
    <TeacherPreviousEvents
      renderEvents={renderEvents}
      eventsTaughtByUser={eventsTaughtByUser}
    />
  );
};
