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
        </>
      )}
    </div>
  );
};
