import React from 'react';
import { LineChart, BarChart, PieChart } from './Charts.js';
import DataTable from './DataTable.js';
import SvelteComponentWrapper from './SvelteComponentWrapper.js';

class Dashboard extends React.Component {
    render() {
        return ( <
            div className = "dashboard" >
            <
            nav className = "navbar" >
            <
            h1 > Fruit Grading Admin Dashboard < /h1> <
            /nav> <
            main >
            <
            section className = "charts" >
            <
            LineChart / >
            <
            BarChart / >
            <
            PieChart / >
            <
            /section> <
            section className = "data-table" >
            <
            DataTable / >
            <
            /section> <
            section id = "svelte-container" >
            <
            SvelteComponentWrapper name = "Admin" / >
            <
            /section> <
            /main> <
            /div>
        );
    }
}

export default Dashboard;