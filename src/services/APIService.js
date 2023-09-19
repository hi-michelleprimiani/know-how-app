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

export const deleteEvent = async (eventToDelete) => {
  const response = await fetch(
    `http://localhost:8088/events/${eventToDelete}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const deletedEvent = await response.json();
  return deletedEvent;
};

export const deleteRegistration = async (registrationIdToDelete) => {
  const response = await fetch(
    `http://localhost:8088/registrations/${registrationIdToDelete}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const deletedEvent = await response.json();
  return deletedEvent;
};
