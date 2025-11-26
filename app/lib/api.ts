import { AQIData } from './types';

export async function fetchAQI(latitude: number, longitude: number): Promise<AQIData> {
    try {
        const response = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone`
        );
        const data = await response.json();
        const current = data.current;
        const aqi = current.us_aqi;

        let level = 'Good';
        let message = 'Air quality is satisfactory.';

        if (aqi > 50) {
            level = 'Moderate';
            message = 'Air quality is acceptable.';
        }
        if (aqi > 100) {
            level = 'Unhealthy for Sensitive Groups';
            message = 'Members of sensitive groups may experience health effects.';
        }
        if (aqi > 150) {
            level = 'Unhealthy';
            message = 'Everyone may begin to experience health effects.';
        }
        if (aqi > 200) {
            level = 'Very Unhealthy';
            message = 'Health warnings of emergency conditions.';
        }
        if (aqi > 300) {
            level = 'Hazardous';
            message = 'Health alert: everyone may experience more serious health effects.';
        }

        return {
            city: "Current Location", // We'll update this with reverse geocoding if possible, or just generic
            aqi,
            level,
            message,
            updatedAt: new Date().toISOString(),
            pollutants: {
                pm2_5: current.pm2_5,
                pm10: current.pm10,
                ozone: current.ozone,
                nitrogen_dioxide: current.nitrogen_dioxide,
                sulphur_dioxide: current.sulphur_dioxide,
                carbon_monoxide: current.carbon_monoxide,
            },
        };
    } catch (error) {
        console.error("Failed to fetch AQI:", error);
        throw error;
    }
}

export async function fetchCityName(latitude: number, longitude: number): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
        );
        const data = await response.json();
        const addr = data.address;
        return addr.city || addr.town || addr.village || addr.municipality || addr.suburb || addr.county || addr.state || addr.country || "Unknown Location";
    } catch (error) {
        console.error("Failed to fetch city name:", error);
        return "Unknown Location";
    }
}
