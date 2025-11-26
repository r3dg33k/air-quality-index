"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import AQICard from "./components/AQICard";
import AISummary from "./components/AISummary";
import { mockAQIData } from "./lib/mockData";
import { fetchAQI, fetchCityName } from "./lib/api";
import { AQIData } from "./lib/types";

// Dynamically import Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />
});

export default function Home() {
  const [center, setCenter] = useState<[number, number]>([37.7749, -122.4194]);
  const [aqiData, setAqiData] = useState<AQIData>(mockAQIData);
  const [loading, setLoading] = useState(false);

  const handleMapClick = async (lat: number, lng: number) => {
    setLoading(true);
    setCenter([lat, lng]);
    try {
      const [newAQI, cityName] = await Promise.all([
        fetchAQI(lat, lng),
        fetchCityName(lat, lng)
      ]);

      setAqiData({
        ...newAQI,
        city: cityName
      });
    } catch (error) {
      console.error("Failed to update data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <Map center={center} aqi={aqiData.aqi} onMapClick={handleMapClick} />
      </div>

      {/* Floating Overlay Content */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto">
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start pointer-events-none">

          <div className="text-center mb-8 pointer-events-auto bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg transition-all hover:bg-white/90">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Air Quality Index
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Click anywhere on the map to check air quality
            </p>
          </div>

          <div className="w-full max-w-4xl space-y-6 pointer-events-auto">
            {/* AI Summary Prioritized */}
            <AISummary
              city={aqiData.city}
              aqi={aqiData.aqi}
              level={aqiData.level}
            />

            <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              <AQICard data={aqiData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
