// FRUIT-GRADING/src/components/BarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data"); // Adjust the API endpoint if needed
        const sampleData = response.data;

        const labels = sampleData.map(item => item.sample); // Example: using 'sample' field for labels
        const values = sampleData.map(item => item.quality); // Assuming 'quality' holds numeric values
        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Sample Quality",
              data: values, // Using the values for the bar chart
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
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
      <h2>Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
