import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
    }, ],
};

const BarChart = () => ( <
    div >
    <
    h2 > Bar Chart < /h2> <
    Bar data = { data }
    /> <
    /div>
);

export default BarChart;