import React from 'react';
import LineChart from './LineChart.js';
import BarChart from './BarChart.js';
import PieChart from './PieChart.js';

const Charts = () => {
    return ( <
        div className = "chart-container" >
        <
        div className = "chart" >
        <
        LineChart / >
        <
        /div> <
        div className = "chart" >
        <
        BarChart / >
        <
        /div> <
        div className = "chart" >
        <
        PieChart / >
        <
        /div> < /
        div >
    );
};

export default Charts;