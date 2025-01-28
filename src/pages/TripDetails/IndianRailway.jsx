import React, { useState } from "react";
import axios from "axios";

const IndianRailway = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trainData, setTrainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!source || !destination) {
      setError("Please enter both source and destination station codes.");
      return;
    }

    setError("");
    setLoading(true);
    setTrainData([]);

    const options = {
      method: "GET",
      url: "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
      params: {
        fromStationCode: source,
        toStationCode: destination,
        dateOfJourney: "2025-01-17",
      },
      headers: {
        "x-rapidapi-key": "a723e52050msh168a655572d8a0ap1f8414jsne8b9ac72e2a0",
        "x-rapidapi-host": "irctc1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setTrainData(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch train data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Train Schedule Finder</h1>
      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700">
            Source Station Code
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter source station code"
            required
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Destination Station Code
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter destination station code"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {trainData.length > 0 && (
        <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trainData.map((train) => (
            <div
              key={train.train_number}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{train.train_name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Train Number:</strong> {train.train_number}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Departure:</strong> {train.from_station} ({train.departure_time})
              </p>
              <p className="text-sm text-gray-600">
                <strong>Arrival:</strong> {train.to_station} ({train.arrival_time})
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && trainData.length === 0 && !error && (
        <p className="mt-6 text-gray-500">No train data available.</p>
      )}
    </div>
  );
};

export default IndianRailway;
