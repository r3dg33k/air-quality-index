export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 78,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2025-12-07T00:46:29.981Z",
};
