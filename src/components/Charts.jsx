// fruit_grading/src/components/Charts.js
import React from "react";
import LineChart from "./LineChart.jsx";
import BarChart from "./BarChart.jsx";
import PieChart from "./PieChart.jsx";

const Charts = () => {
  return (
    <div className="chart-container">
      <div className="chart">
        <LineChart />
      </div>{" "}
      <div className="chart">
        <BarChart />
      </div>{" "}
      <div className="chart">
        <PieChart />
      </div>{" "}
    </div>
  );
};

export default Charts;
