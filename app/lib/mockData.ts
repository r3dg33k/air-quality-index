export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 82,
  level: "Moderate",
  message: "Air quality is acceptable.",
  updatedAt: "2026-03-22T00:59:12.653Z",
};
