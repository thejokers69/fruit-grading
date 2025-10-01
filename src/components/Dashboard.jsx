// FRUIT-GRADING/src/components/Dashboard.js
import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DataTable from "./DataTable";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { users } = useAuth();
  console.log(users);

  return (
    <div>
      <div className="profile-summary">
        {users.map((profile) => (
          <div key={profile.id} className="profile-summary-container">
            {profile.photo ? (
              <img
                src={profile.photo}
                width="80px"
                alt={`${profile.firstName} ${profile.lastName}`}
                className="profile-summary-photo"
              />
            ) : (
              <div 
                className="profile-summary-photo-placeholder"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#f0f0f0",
                  border: "2px dashed #ccc",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "#666"
                }}
              >
                No Photo
              </div>
            )}
            <p>
              <strong>Nom Complet :</strong> {profile.firstName}{" "}
              {profile.lastName}
            </p>
            <p>
              <strong>Rôle :</strong> {profile.role}
            </p>
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
