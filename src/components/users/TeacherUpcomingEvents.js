export const TeacherUpcomingEvents = ({ renderEvents, eventsTaughtByUser }) => {
  const isEventPast = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(eventDate).setHours(0, 0, 0, 0) < today;
  };

  const upcomingEvents = eventsTaughtByUser.filter(
    (event) => !isEventPast(event.date)
  );

  return (
    <>
      <h2 className="events-title">Your Upcoming Events</h2>
      {renderEvents(
        upcomingEvents,
        "You are not teaching any events yet.",
        true
      )}
    </>
  );
};
