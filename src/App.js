import React from 'react';
import LineChart from './components/LineChart.js';
import BarChart from './components/BarChart.js';
import PieChart from './components/PieChart.js';
import DataTable from './components/DataTable.js';

function App() {
    return ( <
        div className = "container" >
        <
        header >
        <
        h1 > Fruit Grading Admin Dashboard < /h1> <
        /header>

        <
        div className = "chart-container" >
        <
        div className = "chart" >
        <
        h2 > Line Chart < /h2> <
        LineChart / >
        <
        /div> <
        div className = "chart" >
        <
        h2 > Bar Chart < /h2> <
        BarChart / >
        <
        /div> <
        div className = "chart" >
        <
        h2 > Pie Chart < /h2> <
        PieChart / >
        <
        /div> <
        /div>

        <
        DataTable / >

        <
        footer >
        <
        p > ©2024 Fruit Grading Admin Dashboard < /p> <
        /footer> <
        /div>
    );
}

export default App;