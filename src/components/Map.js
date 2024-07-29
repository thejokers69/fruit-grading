import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const sampleLocations = [
    { id: 1, lat: 51.505, lng: -0.09, sample: 'Sample 1' },
    { id: 2, lat: 51.51, lng: -0.1, sample: 'Sample 2' }
];

const Map = () => {
    return ( <
        MapContainer center = {
            [51.505, -0.09] }
        zoom = { 13 }
        style = {
            { height: '500px', width: '100%' } } >
        <
        TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' /
        > {
            sampleLocations.map(location => ( <
                Marker key = { location.id }
                position = {
                    [location.lat, location.lng] } >
                <
                Popup > { location.sample } <
                /Popup> <
                /Marker>
            ))
        } <
        /MapContainer>
    );
};

export default Map;