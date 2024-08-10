import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SampleTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/data');
                console.log('Data fetched:', response.data); // Check the fetched data in the console
                setData(response.data); // Store the data in the state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sample</th>
                        <th>Quality</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.sample}</td>
                                <td>{item.quality}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SampleTable;