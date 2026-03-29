export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 253,
  level: "Very Unhealthy",
  message: "Health warnings of emergency conditions.",
  updatedAt: "2026-03-29T01:06:14.465Z",
};
