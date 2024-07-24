import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function SampleMap() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/locations')
            .then(response => setLocations(response.data))
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    return ( <
        MapContainer center = {
            [51.505, -0.09] }
        zoom = { 13 }
        style = {
            { height: '400px', width: '100%' } } >
        <
        TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution = "&copy; OpenStreetMap contributors" /
        > {
            locations.map(location => ( <
                Marker key = { location.id }
                position = {
                    [location.lat, location.lng] } >
                <
                Popup > { location.sample } < /Popup> <
                /Marker>
            ))
        } <
        /MapContainer>
    );
}

export default SampleMap;