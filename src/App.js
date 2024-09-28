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
import UserTable from './components/UserTable.js';
import Sidebar from './components/Sidebar.js';
import './App.css';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user } = useAuth();
    return user && allowedRoles.includes(user.role) ? element : <Navigate to="/login" />;
};

// A layout that includes the sidebar
const LayoutWithSidebar = ({ children }) => {
    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Route - No Sidebar */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes - With Sidebar */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute
                                element={
                                    <LayoutWithSidebar>
                                        <Dashboard />
                                    </LayoutWithSidebar>
                                }
                                allowedRoles={['admin', 'user']}
                            />
                        }
                    />
                    <Route
                        path="/charts"
                        element={
                            <ProtectedRoute
                                element={
                                    <LayoutWithSidebar>
                                        <Charts />
                                    </LayoutWithSidebar>
                                }
                                allowedRoles={['admin', 'user']}
                            />
                        }
                    />
                    <Route
                        path="/table"
                        element={
                            <ProtectedRoute
                                element={
                                    <LayoutWithSidebar>
                                        <Table />
                                    </LayoutWithSidebar>
                                }
                                allowedRoles={['admin', 'user']}
                            />
                        }
                    />
                    <Route
                        path="/map"
                        element={
                            <ProtectedRoute
                                element={
                                    <LayoutWithSidebar>
                                        <Map />
                                    </LayoutWithSidebar>
                                }
                                allowedRoles={['admin', 'user']}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                element={
                                    <LayoutWithSidebar>
                                        <Profile />
                                    </LayoutWithSidebar>
                                }
                                allowedRoles={['admin', 'user']}
                            />
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute
                                element={
                                    <LayoutWithSidebar>
                                        <UserTable />
                                    </LayoutWithSidebar>
                                }
                                allowedRoles={['admin']}
                            />
                        }
                    />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;