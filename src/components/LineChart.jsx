// FRUIT-GRADING/src/components/LineChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

// Function to map quality strings to numerical values
const mapQualityToNumber = (quality) => {
  switch (quality.toLowerCase()) {
    case "excellent":
      return 5;
    case "good":
      return 4;
    case "average":
      return 3;
    case "poor":
      return 2;
    case "bad":
      return 1;
    default:
      return 0;
  }
};

const LineChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data"); // Your API endpoint for SampleData
        const sampleData = response.data;

        // Transform the sampleData into the format required by the chart
        const labels = sampleData.map((item) => new Date(item.date).toLocaleDateString());
        const values = sampleData.map((item) => mapQualityToNumber(item.quality)); // Map quality to numbers

        setData({
          labels: labels,
          datasets: [
            {
              label: "Sample Quality Over Time",
              data: values,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return <Line data={data} />;
};

export default LineChart;
