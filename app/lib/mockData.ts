export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 235,
  level: "Very Unhealthy",
  message: "Health warnings of emergency conditions.",
  updatedAt: "2025-12-21T00:46:37.645Z",
};
