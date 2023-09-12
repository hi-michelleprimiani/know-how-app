export const getEvents = () => {
  return fetch("http://localhost:8088/events").then((res) => res.json());
};

export const getEventsById = (eventsId) => {
  return fetch(`http://localhost:8088/events/${eventsId}`).then((res) =>
    res.json()
  );
};

export const getUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

export const getCategory = () => {
  return fetch("http://localhost:8088/categories").then((res) => res.json());
};

export const getEventCategories = () => {
  return fetch("http://localhost:8088/eventCategories").then((res) =>
    res.json()
  );
};
