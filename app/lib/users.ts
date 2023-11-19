import UserDetails from "../interfaces/user-details.interfaces";

let users: UserDetails[] = [
  // {
  //   _id: "1",
  //   fullname: "My Full Name",
  //   email: "someone@gmail.com",
  //   location: "Ghana - Accra",
  //   eventId: "1",
  // },
];

// handlers
export const getUsers = () => users;

export const addUser = (user: UserDetails) => {
  users.push(user);
};

export const deleteUser = (userId: string) => {
  users = users.filter((user) => user._id !== userId);
};

export const updateUser = (userId: string, changes: Partial<UserDetails>) => {
  // Find the index of the user in the users array
  const userIndex = users.findIndex((user) => user._id === userId);

  if (userIndex !== -1) {
    // Create a new object for the updated user with the specified changes
    const updatedUser = {
      ...users[userIndex],
      ...changes,
    };

    // Update the users array with the new user object
    users[userIndex] = updatedUser;

    // Optionally, you may want to return the updated user
    return updateUser;
  } else {
    throw new Error("USER NOT FOUND");
  }
};

export const getById = (userId: string) => {
  return users.find((user) => user._id === userId);
};
