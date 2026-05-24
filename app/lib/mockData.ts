export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 84,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2026-05-24T01:49:41.800Z",
};
