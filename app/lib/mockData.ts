export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 137,
  level: "Unhealthy for Sensitive Groups",
  message: "Members of sensitive groups may experience health effects.",
  updatedAt: "2025-12-28T00:49:59.882Z",
};
