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
        eventsTaughtByUser.map((event) => (
          <div key={event.id} className="profile-events">
            {event.className}
            <div className="profile-buttons">
              <button
                className="profile-view-button"
                onClick={() => handleView(event.id)}
              >
                View
              </button>
              <button
                onClick={() => handleEdit(event.id)}
                className="profile-edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="profile-delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>You are not teaching any events yet.</div>
      )}
    </>
  );
};
