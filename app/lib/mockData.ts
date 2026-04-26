export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 136,
  level: "Unhealthy for Sensitive Groups",
  message: "Members of sensitive groups may experience health effects.",
  updatedAt: "2026-04-26T01:16:28.729Z",
};
