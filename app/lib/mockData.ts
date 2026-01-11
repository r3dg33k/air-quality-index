export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 61,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2026-01-11T00:50:26.758Z",
};
