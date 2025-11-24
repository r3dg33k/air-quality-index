export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 40,
  level: "Good",
  message: "Air quality is satisfactory.",
  updatedAt: "2025-11-24T17:42:16.783Z",
};
