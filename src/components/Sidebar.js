// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const logo = `${process.env.PUBLIC_URL}/assets/mascir.jpeg`;

    return ( <
        div className = "sidebar" >
        <
        img src = { logo }
        alt = "Logo" / >
        <
        h2 > MAScIR < /h2> <
        ul > {
            user ? ( <
                >
                <
                li > < NavLink to = "/dashboard" > Dashboard < /NavLink></li >
                <
                li > < NavLink to = "/charts" > Charts < /NavLink></li >
                <
                li > < NavLink to = "/table" > Table < /NavLink></li >
                <
                li > < NavLink to = "/map" > Map < /NavLink></li >
                <
                li > < NavLink to = "/profile" > Profile < /NavLink></li > {
                    user.role === 'admin' && ( <
                        li > < NavLink to = "/users" > User Management < /NavLink></li >
                    )
                } <
                li > < NavLink to = "/logout"
                onClick = { logout } > Logout < /NavLink></li >
                <
                />
            ) : ( <
                li > < NavLink to = "/login" > Login < /NavLink></li >
            )
        } <
        /ul> <
        /div>
    );
};

export default Sidebar;