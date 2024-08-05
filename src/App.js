// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.js';
import Dashboard from './components/Dashboard.js';
import Charts from './components/Charts.js';
import Table from './components/DataTable.js';
import Map from './components/Map.js';
import Profile from './components/Profile.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Sidebar from './components/Sidebar.js';
import './App.css';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user } = useAuth();
    return user && allowedRoles.includes(user.role) ? element : < Navigate to = "/login" /> ;
};

const App = () => {
        return ( <AuthProvider>
                <Router>
                <div className = "container">
                <Sidebar / >
                <div className = "main-content">
                <Routes>
                <Route path = "/dashboard"
                element = { < ProtectedRoute element = { <Dashboard/> }
                    allowedRoles = {
                        ['admin', 'user'] }
                    />} />
                    <Route path = "/charts"
                    element = { <ProtectedRoute element = { <Charts/> }
                        allowedRoles = {
                            ['admin', 'user'] }
                        />} />
                        <Route path = "/table"
                        element = { < ProtectedRoute element = { < Table /> }
                            allowedRoles = {
                                ['admin', 'user'] }
                            />} />
                            <Route path = "/map"
                            element = { < ProtectedRoute element = { <Map /> }
                                allowedRoles = {
                                    ['admin', 'user'] }
                                />} />
                                <Route path = "/profile"
                                element = { < ProtectedRoute element = { < Profile /> }
                                    allowedRoles = {
                                        ['admin'] }
                                    />} />
                                    <Route path = "/login"
                                    element = { <Login /> }
                                    /> 
                                    <Route path = "/logout"
                                    element = { <Logout /> }
                                    /> 
                                    <Route path = "/"
                                    element = { < Navigate to = "/dashboard" /> }
                                    /> </Routes> 
                                    </div> 
                                    </div> 
                                    </Router> 
                                    </AuthProvider>
                                );
                            };

export default App;