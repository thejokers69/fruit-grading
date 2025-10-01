// FRUIT-GRADING/src/components/PieChart.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data"); // Adjust the API endpoint
        const sampleData = response.data;

        const labels = sampleData.map(item => item.sample); // Example: using 'sample' field for labels
        const values = sampleData.map(item => item.quality); // Assuming 'quality' has numeric values
        
        setChartData({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            }
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <Pie data={chartData} />{" "}
    </div>
  );
};

export default PieChart;
