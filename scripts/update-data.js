const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../app/lib/mockData.ts');

// Simulate fetching new data
const newAQI = Math.floor(Math.random() * 300);
let level = 'Good';
let message = 'Air quality is satisfactory.';

if (newAQI > 50) {
    level = 'Moderate';
    message = 'Air quality is acceptable.';
}
if (newAQI > 100) {
    level = 'Unhealthy for Sensitive Groups';
    message = 'Members of sensitive groups may experience health effects.';
}
if (newAQI > 150) {
    level = 'Unhealthy';
    message = 'Everyone may begin to experience health effects.';
}
if (newAQI > 200) {
    level = 'Very Unhealthy';
    message = 'Health warnings of emergency conditions.';
}
if (newAQI > 300) {
    level = 'Hazardous';
    message = 'Health alert: everyone may experience more serious health effects.';
}

const content = `export interface AQIData {
  city: string;
  aqi: number;
  level: string;
  message: string;
  updatedAt: string;
}

export const mockAQIData: AQIData = {
  city: "San Francisco",
  aqi: ${newAQI},
  level: "${level}",
  message: "${message}",
  updatedAt: "${new Date().toISOString()}",
};
`;

fs.writeFileSync(dataPath, content);
console.log(`Updated AQI to ${newAQI}`);
