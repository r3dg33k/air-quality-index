export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: 135,
  level: "Unhealthy for Sensitive Groups",
  message: "Members of sensitive groups may experience health effects.",
  updatedAt: "2026-03-01T01:02:08.199Z",
};
