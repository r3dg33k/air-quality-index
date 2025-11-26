import { AQIData } from './types';

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 40,
  level: "Good",
  message: "Air quality is satisfactory.",
  updatedAt: "2025-11-24T17:42:16.783Z",
  pollutants: {
    pm2_5: 12.5,
    pm10: 20.1,
    ozone: 45.2,
    nitrogen_dioxide: 15.3,
    sulphur_dioxide: 2.1,
    carbon_monoxide: 0.5,
  },
};
