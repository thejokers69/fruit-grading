// src/components/Dashboard.js
import React from 'react';
import LineChart from './LineChart.js';
import BarChart from './BarChart.js';
import PieChart from './PieChart.js';
import DataTable from './DataTable.js';
import { useAuth } from '../contexts/AuthContext.js';

const Dashboard = () => {
    const { users } = useAuth();

    return (
        <div>
            <div className="profile-summary">
                {users.map(profile => (
                    <div key={profile.id} className="profile-summary-container">
                        <img src={profile.photo} width="80px" alt={`${profile.firstName} ${profile.lastName}`} className="profile-summary-photo" />
                        <p><strong>Nom Complet :</strong> {profile.firstName} {profile.lastName}</p>
                        <p><strong>Rôle :</strong> {profile.role}</p>
                    </div>
                ))}
            </div>
            <div className="chart-container">
                <div className="chart">
                    <LineChart />
                </div>
                <div className="chart">
                    <BarChart />
                </div>
                <div className="chart">
                    <PieChart />
                </div>
            </div>
            <DataTable />
        </div>
    );
};

export default Dashboard;