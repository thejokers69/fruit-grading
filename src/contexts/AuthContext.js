import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser, fetchUsers } from '../api/userApi.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async() => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Erreur de chargement des utilisateurs :', error);
            }
        };
        loadUsers();
    }, []);

    // Extrait de AuthProvider
    const addUser = async(newUserData) => {
        try {
            const newUser = await createUser(newUserData);
            setUsers(prevUsers => [...prevUsers, newUser]); // Ajoute le nouvel utilisateur
        } catch (error) {
            console.error('Erreur d\'ajout de l\'utilisateur :', error);
        }
    };

    const updateUserProfile = async(userId, userData) => {
        try {
            const updatedUser = await updateUser(userId, userData);
            setUsers(prevUsers => prevUsers.map(u => (u.id === userId ? updatedUser : u)));
            if (user && user.id === userId) setUser(updatedUser);
        } catch (error) {
            console.error('Erreur de mise à jour de l\'utilisateur :', error);
        }
    };

    const deleteUserFromContext = async(userId) => {
        try {
            await deleteUser(userId);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== userId)); // Supprime l'utilisateur de l'état
        } catch (error) {
            console.error('Erreur de suppression de l\'utilisateur :', error);
        }
    };

    const logout = () => {
        setUser(null);
        // Vous pouvez également nettoyer les données locales ou d'autres états ici si nécessaire
    };

    return ( <
        AuthContext.Provider value = {
            { user, setUser, users, addUser, updateUser: updateUserProfile, deleteUser: deleteUserFromContext, logout } } > { children } <
        /AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);