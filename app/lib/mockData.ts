export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 59,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2026-03-15T01:04:07.741Z",
};
