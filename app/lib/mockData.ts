export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 206,
  level: "Very Unhealthy",
  message: "Health warnings of emergency conditions.",
  updatedAt: "2026-02-01T01:03:11.365Z",
};
