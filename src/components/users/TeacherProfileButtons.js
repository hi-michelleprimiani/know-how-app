export const TeacherProfileButtons = ({
  handleDelete,
  handleEdit,
  handleView,
  event,
}) => {
  return (
    <>
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
    </>
  );
};
