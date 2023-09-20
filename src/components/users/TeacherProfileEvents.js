import "./TeacherProfileEvents.css";

export const TeacherProfileEvents = ({
  eventsTaughtByUser,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  return (
    <>
      <h2 className="events-title">Your Upcoming Events</h2>
      {eventsTaughtByUser && eventsTaughtByUser.length > 0 ? (
        eventsTaughtByUser.map((event) => {
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
              <div className="profile-buttons">
                <button
                  className="profile-view-button"
                  onClick={() => handleView(event.id)}
                >
                  View
                </button>
                <button
                  className="profile-edit-button"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit
                </button>
                <button
                  className="profile-delete-button"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>You are not teaching any events yet.</div>
      )}
    </>
  );
};
