export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 156,
  level: "Unhealthy",
  message: "Everyone may begin to experience health effects.",
  updatedAt: "2026-04-05T01:06:39.236Z",
};
