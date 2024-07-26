import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
        ],
    }],
};

const PieChart = () => ( <
    div >
    <
    Pie data = { data }
    /> < /
    div >
);

export default PieChart;