import React from 'react';
import LineChart from './LineChart.js';
import BarChart from './BarChart.js';
import PieChart from './PieChart.js';
import DataTable from './DataTable.js';

const profiles = [{
        id: 1,
        firstName: 'Brahim',
        lastName: 'Lakssir',
        role: 'Admin',
        photo: '/assets/blakssir.jpeg'
    },
    {
        id: 2,
        firstName: 'Nouhaila',
        lastName: 'Benzakour',
        role: 'Admin',
        photo: '/assets/logo.svg'
    },
    {
        id: 3,
        firstName: 'Mohamed',
        lastName: 'Lakssir',
        role: 'User',
        photo: '/assets/logo.svg'
    },

];

const Dashboard = () => {
    return ( <
        div >
        <
        div className = "profile-summary" > {
            profiles.map(profile => ( <
                div key = { profile.id }
                className = "profile-summary-container" >
                <
                img src = { profile.photo }
                alt = { `${profile.firstName} ${profile.lastName}` }
                className = "profile-summary-photo" / >
                <
                p > < strong > Full Name: < /strong> {profile.firstName} {profile.lastName}</p >
                <
                p > < strong > Role: < /strong> {profile.role}</p >
                <
                /div>
            ))
        } <
        /div> <
        div className = "chart-container" >
        <
        div className = "chart" >
        <
        LineChart / >
        <
        /div> <
        div className = "chart" >
        <
        BarChart / >
        <
        /div> <
        div className = "chart" >
        <
        PieChart / >
        <
        /div> < /
        div > <
        DataTable / >
        <
        /div>
    );
};

export default Dashboard;