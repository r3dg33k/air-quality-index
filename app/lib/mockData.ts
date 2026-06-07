export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 85,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2026-06-07T02:01:24.965Z",
};
