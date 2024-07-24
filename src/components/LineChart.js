import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
    }, ],
};

const LineChart = () => ( <
    div >
    <
    h2 > Line Chart < /h2> <
    Line data = { data }
    /> <
    /div>
);

export default LineChart;