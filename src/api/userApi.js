// src/api/userApi.js
export const createUser = async (userData) => {
  const response = await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch("http://localhost:3001/api/users", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
