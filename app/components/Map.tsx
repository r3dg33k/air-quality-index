"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapProps {
    center: [number, number];
    aqi: number;
    onMapClick?: (lat: number, lng: number) => void;
}

const MapEvents = ({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) => {
    const map = useMapEvents({
        click(e) {
            if (onMapClick) {
                onMapClick(e.latlng.lat, e.latlng.lng);
                map.flyTo(e.latlng, map.getZoom());
            }
        },
    });
    return null;
};

const Map = ({ center, aqi, onMapClick }: MapProps) => {

    const getCircleColor = (aqi: number) => {
        if (aqi <= 50) return '#22c55e'; // green-500
        if (aqi <= 100) return '#eab308'; // yellow-500
        if (aqi <= 150) return '#f97316'; // orange-500
        if (aqi <= 200) return '#ef4444'; // red-500
        if (aqi <= 300) return '#a855f7'; // purple-500
        return '#7f1d1d'; // red-900
    };

    return (
        <MapContainer
            center={center}
            zoom={11}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
            zoomControl={false}
            minZoom={3}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                noWrap={true}
            />
            <MapEvents onMapClick={onMapClick} />
            <Marker position={center} icon={customIcon}>
                <Popup>
                    Selected Location
                </Popup>
            </Marker>
            <Circle
                center={center}
                pathOptions={{
                    color: getCircleColor(aqi),
                    fillColor: getCircleColor(aqi),
                    fillOpacity: 0.4
                }}
                radius={2000}
            />
        </MapContainer>
    );
};

export default Map;
