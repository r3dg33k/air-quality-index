export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 12,
  level: "Good",
  message: "Air quality is satisfactory.",
  updatedAt: "2026-05-31T01:56:40.679Z",
};
