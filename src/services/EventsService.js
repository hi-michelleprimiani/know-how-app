export const getEvents = () => {
  return fetch("http://localhost:8088/events").then((res) => res.json());
};

export const getEventsById = (eventsId) => {
  return fetch(`http://localhost:8088/events/${eventsId}`).then((res) =>
    res.json()
  );
};
