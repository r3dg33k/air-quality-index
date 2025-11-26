import React from 'react';
import GlassCard from './GlassCard';
import { AQIData } from '../lib/types';

interface AQICardProps {
    data: AQIData;
}

const AQICard: React.FC<AQICardProps> = ({ data }) => {
    const [showDetails, setShowDetails] = React.useState(false);

    const getStatusColor = (aqi: number) => {
        if (aqi <= 50) return 'text-green-500';
        if (aqi <= 100) return 'text-yellow-500';
        if (aqi <= 150) return 'text-orange-500';
        if (aqi <= 200) return 'text-red-500';
        if (aqi <= 300) return 'text-purple-500';
        return 'text-red-900';
    };

    const getBgColor = (aqi: number) => {
        if (aqi <= 50) return 'bg-green-500/10 border-green-200';
        if (aqi <= 100) return 'bg-yellow-500/10 border-yellow-200';
        if (aqi <= 150) return 'bg-orange-500/10 border-orange-200';
        if (aqi <= 200) return 'bg-red-500/10 border-red-200';
        if (aqi <= 300) return 'bg-purple-500/10 border-purple-200';
        return 'bg-red-900/10 border-red-900';
    };

    const PollutantItem = ({ label, value, unit = 'µg/m³' }: { label: string, value: number | undefined, unit?: string }) => (
        <div className="flex flex-col items-center p-3 bg-white/30 rounded-lg backdrop-blur-sm border border-white/20">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
            <span className="text-lg font-bold text-gray-800 mt-1">
                {value !== undefined ? value : '--'}
            </span>
            <span className="text-[10px] text-gray-400">{unit}</span>
        </div>
    );

    return (
        <GlassCard className="max-w-4xl mx-auto p-0 overflow-hidden transition-all duration-500 ease-in-out">
            {/* Header Section */}
            <div className={`p-8 text-center border-b ${getBgColor(data.aqi)} transition-colors duration-500 relative`}>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.city}</h2>
                <p className="text-sm text-gray-600 mb-8 font-medium opacity-75">
                    Last updated: {new Date(data.updatedAt).toLocaleTimeString()}
                </p>

                <div className="relative inline-flex items-center justify-center cursor-pointer group" onClick={() => setShowDetails(!showDetails)}>
                    {/* Decorative Ring */}
                    <div className={`absolute inset-0 rounded-full border-4 opacity-20 ${getStatusColor(data.aqi).replace('text-', 'border-')} scale-110 group-hover:scale-125 transition-transform duration-300`}></div>

                    <div className="text-center z-10">
                        <div className={`text-8xl font-black ${getStatusColor(data.aqi)} tracking-tighter drop-shadow-sm`}>
                            {data.aqi}
                        </div>
                        <div className={`text-2xl font-bold mt-2 ${getStatusColor(data.aqi)}`}>
                            {data.level}
                        </div>
                    </div>
                </div>

                <div className="mt-8 max-w-lg mx-auto">
                    <p className="text-gray-700 text-lg font-medium leading-relaxed">
                        "{data.message}"
                    </p>
                </div>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-6 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center mx-auto gap-2"
                >
                    {showDetails ? 'Hide Pollutants' : 'Show Pollutants'}
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Pollutants Grid - Retractable */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-8 bg-white/40">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
                        Pollutant Concentration
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <PollutantItem label="PM2.5" value={data.pollutants?.pm2_5} />
                        <PollutantItem label="PM10" value={data.pollutants?.pm10} />
                        <PollutantItem label="O3" value={data.pollutants?.ozone} />
                        <PollutantItem label="NO2" value={data.pollutants?.nitrogen_dioxide} />
                        <PollutantItem label="SO2" value={data.pollutants?.sulphur_dioxide} />
                        <PollutantItem label="CO" value={data.pollutants?.carbon_monoxide} />
                    </div>
                </div>
            </div>
        </GlassCard>
    );
};

export default AQICard;
