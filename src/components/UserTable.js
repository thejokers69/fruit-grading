// src/components/UserTable.js
import React, { useState, useEffect } from "react"; 
import { useAuth } from "../contexts/AuthContext.js";
import "./UserTable.css";

const UserTable = () => {
  const { users, setUsers, addUser, updateUser, deleteUser, user } = useAuth();
  const [newUser, setNewUser] = useState({
    username: "",
    role: "user",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        if (response.ok) { 
          const realData = await response.json();
          setUsers(realData);
        } else {
          alert("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        alert("Failed to fetch users.");
      }
    };
    fetchUsersData();
  }, [setUsers]);

  if (user.role !== "admin") {
    return (
      <div>
        Accès refusé. Seuls les administrateurs peuvent gérer les utilisateurs.
      </div>
    );
  }

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
          role: newUser.role,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUsers((prevUsers) => [...prevUsers, data.user]);
        setNewUser({ username: "", role: "user", password: "" });
      } else {
        alert(data.message || "Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentEditUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(currentEditUser.id, currentEditUser);
      setIsEditing(false);
      setCurrentEditUser(null);
    } catch (error) {
      console.error("Erreur de mise à jour de l'utilisateur :", error);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteUser(id); 
        if (response.ok) { 
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); 
          alert('User deleted successfully'); 
        } else {
          alert(response.message || "Erreur lors de la suppression de l'utilisateur.");
        }
      } catch (error) {
        console.error("Erreur de suppression de l'utilisateur :", error);
        alert(
          "Erreur lors de la suppression de l'utilisateur. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <div className="user-table-container">
      <h2>Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Modifier</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="edit-container">
          <h3>Modifier l'utilisateur</h3>
          <input
            type="text"
            value={currentEditUser.username}
            onChange={(e) =>
              setCurrentEditUser({
                ...currentEditUser,
                username: e.target.value,
              })
            }
            placeholder="Nom d'utilisateur"
          />
          <select
            value={currentEditUser.role}
            onChange={(e) =>
              setCurrentEditUser({ ...currentEditUser, role: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
          </select>
          <button onClick={handleUpdateUser}>Mettre à jour</button>
        </div>
      )}

      <div className="add-container">
        <h3>Ajouter un nouvel utilisateur</h3>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="Nom d'utilisateur"
        />
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Mot de passe"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="user">Utilisateur</option>
        </select>
        <button onClick={handleAddUser}>Ajouter</button>
      </div>
    </div>
  );
};

export default UserTable;
