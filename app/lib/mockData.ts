export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 113,
  level: "Unhealthy for Sensitive Groups",
  message: "Members of sensitive groups may experience health effects.",
  updatedAt: "2026-02-08T01:11:54.374Z",
};
