"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import ReactMarkdown from 'react-markdown';

interface AISummaryProps {
    city: string;
    aqi: number;
    level: string;
}

const AISummary: React.FC<AISummaryProps> = ({ city, aqi, level }) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/summarize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ city, aqi, level }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch summary');
                }

                setSummary(data.summary);
            } catch (err) {
                setError('AI analysis unavailable. Please check API configuration.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (city && aqi) {
            fetchSummary();
        }
    }, [city, aqi, level]);

    return (
        <GlassCard className="max-w-2xl mx-auto mt-8 p-6 text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">✨</span> AI Analysis
            </h3>

            {loading && (
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
            )}

            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            {summary && (
                <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
            )}
        </GlassCard>
    );
};

export default AISummary;
