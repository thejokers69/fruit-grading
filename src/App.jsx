import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";
import Table from "./components/DataTable";
import Map from "./components/Map";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Logout from "./components/Logout";
import UserTable from "./components/UserTable";
import Sidebar from "./components/Sidebar";
import "./App.css";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  return user && allowedRoles.includes(user.role) ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// A layout that includes the sidebar
const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
};

LayoutWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
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
                allowedRoles={["admin", "user"]}
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
                allowedRoles={["admin", "user"]}
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
                allowedRoles={["admin", "user"]}
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
                allowedRoles={["admin", "user"]}
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
                allowedRoles={["admin", "user"]}
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
                allowedRoles={["admin"]}
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
