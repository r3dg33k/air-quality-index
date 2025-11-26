export interface AQIData {
    city: string;
    aqi: number;
    level: string;
    message: string;
    updatedAt: string;
    pollutants?: {
        pm2_5: number;
        pm10: number;
        ozone: number;
        nitrogen_dioxide: number;
        sulphur_dioxide: number;
        carbon_monoxide: number;
    };
}
