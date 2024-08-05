// src/components/Map.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup("You are here").openPopup();
                map.setView([latitude, longitude], 13);
            });
        }

        fetch('http://localhost:3001/api/locations')
            .then(response => response.json())
            .then(locations => {
                locations.forEach(location => {
                    L.marker([location.lat, location.lng])
                        .addTo(map)
                        .bindPopup(`<b>${location.sample}</b>`);
                });
            });
    }, []);

    return <div id = "map"
    style = {
        { height: '500px' }
    } > < /div>;
};

export default Map;