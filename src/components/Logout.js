import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (logout) {
            logout();
            navigate('/login');
        }
    }, [logout, navigate]);

    return null;
};

export default Logout;