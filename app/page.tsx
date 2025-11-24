import AQICard from "./components/AQICard";
import { mockAQIData } from "./lib/mockData";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Air Quality Index
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Weekly updates on air quality in your area.
          </p>
        </div>
        <div className="mt-12">
          <AQICard data={mockAQIData} />
        </div>
      </div>
    </div>
  );
}
