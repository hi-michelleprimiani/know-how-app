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
