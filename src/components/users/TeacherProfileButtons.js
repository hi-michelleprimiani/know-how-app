import { useNavigate } from "react-router-dom";

export const TeacherProfileButtons = ({
  handleDelete,
  event,
  shouldDisplayViewButtonOnly,
}) => {
  const navigate = useNavigate();

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleView = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleAddToCalendar = () => {
    const eventTitle = event.className;
    const startTime = event.time;
    const location = event.location;
    const details = event.objective;

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="profile-buttons">
      {shouldDisplayViewButtonOnly ? (
        <button
          className="profile-view-button"
          onClick={() => handleView(event.id)}
        >
          View
        </button>
      ) : (
        <>
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
          <button
            className="profile-calendar-button"
            onClick={handleAddToCalendar}
          >
            Add to Google Calendar
          </button>
        </>
      )}
    </div>
  );
};
