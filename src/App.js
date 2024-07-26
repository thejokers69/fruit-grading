import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import Charts from './components/Charts.js';
import Table from './components/DataTable.js';
import Map from './components/Map.js';
import Profile from './components/Profile.js';
import logo from './assets/mascir.jpeg';
import './App.css';

function App() {
    return ( <
        Router >
        <
        div className = "container" >
        <
        div className = "sidebar" >
        <
        img src = { logo }
        alt = "Logo" / >
        <
        h2 > MAScIR < /h2> <
        ul >
        <
        li > < NavLink to = "/dashboard"
        activeClassName = "active" > Dashboard < /NavLink></li >
        <
        li > < NavLink to = "/charts"
        activeClassName = "active" > Charts < /NavLink></li >
        <
        li > < NavLink to = "/table"
        activeClassName = "active" > Table < /NavLink></li >
        <
        li > < NavLink to = "/map"
        activeClassName = "active" > Map < /NavLink></li >
        <
        li > < NavLink to = "/profile"
        activeClassName = "active" > Profile < /NavLink></li >
        <
        /ul> < /
        div > <
        div className = "main-content" >
        <
        Routes >
        <
        Route path = "/dashboard"
        element = { < Dashboard / > }
        /> <
        Route path = "/charts"
        element = { < Charts / > }
        /> <
        Route path = "/table"
        element = { < Table / > }
        /> <
        Route path = "/map"
        element = { < Map / > }
        /> <
        Route path = "/profile"
        element = { < Profile / > }
        /> <
        Route path = "/"
        element = { < Dashboard / > }
        /> < /
        Routes > <
        /div> < /
        div > <
        /Router>
    );
}

export default App;