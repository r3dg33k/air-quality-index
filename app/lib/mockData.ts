export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 189,
  level: "Unhealthy",
  message: "Everyone may begin to experience health effects.",
  updatedAt: "2026-03-08T00:56:31.213Z",
};
