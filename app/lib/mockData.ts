export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 160,
  level: "Unhealthy",
  message: "Everyone may begin to experience health effects.",
  updatedAt: "2026-01-18T00:49:38.836Z",
};
