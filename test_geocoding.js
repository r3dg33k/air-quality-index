const fetch = require('node-fetch');

async function fetchCityName(latitude, longitude) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
        console.log(`Fetching: ${url}`);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'AirQualityApp/1.0' // Nominatim requires a User-Agent
            }
        });
        const data = await response.json();
        console.log('Full Data:', JSON.stringify(data, null, 2));
        if (data.address) {
            console.log('Address Keys:', Object.keys(data.address));
        }
        return data.address?.city || data.address?.town || data.address?.village || data.address?.county || "Unknown Location";
    } catch (error) {
        console.error("Failed to fetch city name:", error);
        return "Unknown Location";
    }
}

// Test with Los Angeles coordinates
fetchCityName(34.0522, -118.2437).then(city => console.log('City Result:', city));
