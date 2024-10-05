// FRUIT-GRADING/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUser,
  updateUser,
  deleteUser,
  fetchUsers,
} from "../api/userApi.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        console.log(usersData); 
        setUsers(usersData);

        const loggedInUsername = localStorage.getItem('loggedInUsername');
        const currentUser = usersData.find(u => u.username === loggedInUsername);
        if (currentUser) {
          setUser(currentUser);  
        }
      } catch (error) {
        console.error("Erreur de chargement des utilisateurs :", error);
      }
    };
    loadUsers();
  }, []);

  const addUser = async (newUserData) => {
    try {
      const newUser = await createUser(newUserData);
      setUsers((prevUsers) => [...prevUsers, newUser]); 
    } catch (error) {
      console.error("Erreur d'ajout de l'utilisateur :", error);
      alert('Failed to add user.');
    }
  };

  const updateUserProfile = async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? updatedUser : u))
      );
      if (user && user.id === userId) setUser(updatedUser);
    } catch (error) {
      console.error("Erreur de mise à jour de l'utilisateur :", error);
      alert('Failed to update user.');
    }
  };

  const deleteUserFromContext = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Erreur de suppression de l'utilisateur :", error);
      alert('Failed to delete user.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        addUser,
        updateUser: updateUserProfile,
        deleteUser: deleteUserFromContext,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
