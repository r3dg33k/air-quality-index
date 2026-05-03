export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 102,
  level: "Unhealthy for Sensitive Groups",
  message: "Members of sensitive groups may experience health effects.",
  updatedAt: "2026-05-03T01:23:16.453Z",
};
