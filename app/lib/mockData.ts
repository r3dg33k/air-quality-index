export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 210,
  level: "Very Unhealthy",
  message: "Health warnings of emergency conditions.",
  updatedAt: "2026-06-14T02:05:19.393Z",
};
