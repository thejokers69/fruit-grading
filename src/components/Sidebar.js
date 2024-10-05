// FRUIT-GRADING/src/components/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaChartBar,
  FaTable,
  FaMap,
  FaUser,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Initialisation de l'état pour la barre latérale
  const logo = `${process.env.PUBLIC_URL}/assets/mascir.jpeg`;

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {" "}
        ☰
      </button>{" "}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <img src={logo} alt="Logo" />
        <h2> MAScIR </h2>{" "}
        <ul>
          {" "}
          {user ? (
            <>
              <li>
                {" "}
                <NavLink to="/dashboard">
                  {" "}
                  <FaTachometerAlt /> Dashboard{" "}
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/charts">
                  {" "}
                  <FaChartBar /> Charts{" "}
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/table">
                  {" "}
                  <FaTable /> Table{" "}
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/map">
                  {" "}
                  <FaMap /> Map{" "}
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/profile">
                  {" "}
                  <FaUser /> Profile{" "}
                </NavLink>
              </li>{" "}
              {user.role === "admin" && (
                <li>
                  {" "}
                  <NavLink to="/users">
                    {" "}
                    <FaUsers /> User Management{" "}
                  </NavLink>
                </li>
              )}{" "}
              <li>
                {" "}
                <NavLink to="/logout" onClick={logout}>
                  {" "}
                  <FaSignOutAlt /> Logout{" "}
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              {" "}
              <NavLink to="/login"> Login </NavLink>
            </li>
          )}{" "}
        </ul>{" "}
      </div>{" "}
    </>
  );
};

export default Sidebar;
