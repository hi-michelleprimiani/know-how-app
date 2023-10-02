import { TeacherPreviousEvents } from "./TeacherPreviousEvents";
import { TeacherProfileButtons } from "./TeacherProfileButtons";
import "./TeacherProfileEvents.css";
import { TeacherUpcomingEvents } from "./TeacherUpcomingEvents";

export const TeacherProfileEvents = ({
  eventsTaughtByUser,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  const renderEvents = (
    eventsArray,
    emptyMessage,
    shouldDisplayButtons,
    shouldDisplayViewButtonOnly
  ) => {
    return eventsArray.length > 0 ? (
      eventsArray.map((event) => {
        const eventDate = new Date(event.date);
        const month = eventDate.getMonth() + 1;
        const day = eventDate.getDate() + 1;
        const year = eventDate.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        return (
          <div key={event.id} className="profile-events">
            <div className="profile-event-name">{event.className}</div>
            <div className="profile-event-details">
              <div>{event.time}</div>
              <div>{formattedDate}</div>
              <div>{event.location}</div>
              <div>{event.fee}</div>
            </div>
            {(shouldDisplayButtons || shouldDisplayViewButtonOnly) && (
              <TeacherProfileButtons
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
                event={event}
                shouldDisplayViewButtonOnly={shouldDisplayViewButtonOnly}
              />
            )}
          </div>
        );
      })
    ) : (
      <div>{emptyMessage}</div>
    );
  };
  return (
    <>
      <TeacherUpcomingEvents
        renderEvents={renderEvents}
        eventsTaughtByUser={eventsTaughtByUser}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
      <TeacherPreviousEvents
        renderEvents={renderEvents}
        eventsTaughtByUser={eventsTaughtByUser}
      />
    </>
  );
};
