import "./TeacherPreviousEvents.css";

export const TeacherPreviousEvents = ({ renderEvents, eventsTaughtByUser }) => {
  const isEventPast = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(eventDate).setHours(0, 0, 0, 0) < today;
  };

  const previousEvents = eventsTaughtByUser.filter((event) =>
    isEventPast(event.date)
  );

  return (
    <>
      <h2 className="events-title">Your Previous Classes</h2>
      {renderEvents(
        previousEvents,
        "You have not taught any classes previously.",
        false,
        true
      )}
    </>
  );
};
