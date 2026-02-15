export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 269,
  level: "Very Unhealthy",
  message: "Health warnings of emergency conditions.",
  updatedAt: "2026-02-15T01:00:00.385Z",
};
