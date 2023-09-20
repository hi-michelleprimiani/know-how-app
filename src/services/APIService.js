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
