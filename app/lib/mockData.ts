export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 270,
  level: "Very Unhealthy",
  message: "Health warnings of emergency conditions.",
  updatedAt: "2026-05-17T01:43:19.443Z",
};
