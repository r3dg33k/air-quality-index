export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 53,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2025-12-14T00:46:58.314Z",
};
