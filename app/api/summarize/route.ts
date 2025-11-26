import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'OpenRouter API key not configured' },
            { status: 500 }
        );
    }

    try {
        const { city, aqi, level } = await request.json();

        const prompt = `Analyze this air quality data for ${city} (AQI: ${aqi}, Level: ${level}). 
    Provide a response with these 4 sections in Markdown format:
    1. **Summary**: Current state analysis.
    2. **Health Advice**: Actionable steps for residents/travelers to avoid health impact.
    3. **Public Action**: What individuals can do to help improve air quality.
    4. **Government Initiatives**: Mention known government projects or standard policies being run in ${city} (or generally in that region) to improve air quality.
    
    Keep the response concise and informative.`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com/r3dg33k/air-quality-index', // Optional, for OpenRouter rankings
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-exp:free',
                messages: [
                    { role: 'user', content: prompt }
                ],
            }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'OpenRouter API error');
        }

        const summary = data.choices[0].message.content;

        return NextResponse.json({ summary });
    } catch (error: any) {
        console.error('AI Summary Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate summary' },
            { status: 500 }
        );
    }
}
