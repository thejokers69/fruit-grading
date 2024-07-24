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
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
        ],
    }, ],
};

const PieChart = () => ( <
    div >
    <
    h2 > Pie Chart < /h2> <
    Pie data = { data }
    /> <
    /div>
);

export default PieChart;