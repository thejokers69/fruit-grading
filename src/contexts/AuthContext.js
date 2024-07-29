// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('role');
        localStorage.removeItem('username');
    };

    return ( <
        AuthContext.Provider value = {
            { user, setUser, logout } } > { children } <
        /AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};