import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateBusRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, stations } = location.state || {};
  
  if (!bus || !stations) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-xl mb-4">Missing bus or stations data.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Filter stations between the source and destination
  const sourceIndex = stations.findIndex(
    (station) => station.station === bus.source.toUpperCase()
  );
  const destinationIndex = stations.findIndex(
    (station) => station.station === bus.destination.toUpperCase()
  );

  const filteredStations =
    sourceIndex !== -1 && destinationIndex !== -1 && sourceIndex <= destinationIndex
      ? stations.slice(sourceIndex, destinationIndex + 1)
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Route for {bus.vehicle_number}
      </h1>
      {filteredStations.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Stations:</h2>
          <ul className="space-y-3">
            {filteredStations.map((station, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-700">{station.station}</span>
                <span className="text-gray-500 text-sm">
                  Arrival: {station.arrivalTime}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600">
          No stations found between the source and destination.
        </p>
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Back
      </button>
    </div>
  );
};

export default PrivateBusRoute;
