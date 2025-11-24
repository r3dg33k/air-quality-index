import React from 'react';
import { AQIData } from '../lib/mockData';

interface AQICardProps {
    data: AQIData;
}

const AQICard: React.FC<AQICardProps> = ({ data }) => {
    const getColor = (aqi: number) => {
        if (aqi <= 50) return 'bg-green-500';
        if (aqi <= 100) return 'bg-yellow-500';
        if (aqi <= 150) return 'bg-orange-500';
        if (aqi <= 200) return 'bg-red-500';
        if (aqi <= 300) return 'bg-purple-500';
        return 'bg-red-900';
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="md:flex">
                <div className={`md:shrink-0 p-8 flex items-center justify-center ${getColor(data.aqi)}`}>
                    <span className="text-4xl font-bold text-white">{data.aqi}</span>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.city}</div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{data.level}</p>
                    <p className="mt-2 text-slate-500">{data.message}</p>
                    <p className="mt-4 text-xs text-gray-400">Updated: {new Date(data.updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default AQICard;
