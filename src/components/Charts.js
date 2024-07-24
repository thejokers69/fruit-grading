import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const dummyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: ['rgba(75,192,192,0.2)'],
        borderColor: ['rgba(75,192,192,1)'],
        borderWidth: 1,
    }, ],
};

export function LineChart() {
    return <Line data = { dummyData }
    />;
}

export function BarChart() {
    return <Bar data = { dummyData }
    />;
}

export function PieChart() {
    return <Pie data = { dummyData }
    />;
}