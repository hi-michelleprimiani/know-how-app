export const getEvents = () => {
  return fetch("http://localhost:8088/events").then((res) => res.json());
};

export const getUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};
