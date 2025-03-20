import React, { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import ksrtc from "../../assets/ksrtc.png"
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api"

const libraries = ["places"]

const KsrtcBus = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOMAPS_API_KEY,
    libraries,
  })

  const [busdata, setBusdata] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { start, end } = location.state || {}

  const [source, setSource] = useState(start || "")
  const [destination, setDestination] = useState(end || "")

  const sourceRef = useRef()
  const destinationRef = useRef()

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const sourceName = source.split(",")[0].trim()
      const destName = destination.split(",")[0].trim()
      const response = await axios.get("http://127.0.0.1:8000/bus-trips/", {
        params: {
          source: sourceName,
          destination: destName,
        },
      })

      setBusdata(response.data)
    } catch (error) {
      setError("Failed to load bus trips. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCardClick = bus => {
    if (bus && bus.stations) {
      navigate("/privatebusroute", {
        state: { bus, stations: bus.stations },
      })
    } else {
      setError("No station data available for the selected bus.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <img
        src={ksrtc}
        alt="KSRTC Logo"
        className="w-30 h-24 object-cover mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        KSRTC Bus Schedule Finder
      </h1>

      {isLoaded ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700"
            >
              Source
            </label>
            <Autocomplete
              onLoad={autocomplete => (sourceRef.current = autocomplete)}
              onPlaceChanged={() => {
                if (sourceRef.current) {
                  setSource(sourceRef.current.getPlace().formatted_address)
                }
              }}
            >
              <input
                type="text"
                id="source"
                value={source}
                onChange={e => setSource(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter source station"
                required
              />
            </Autocomplete>
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <Autocomplete
              onLoad={autocomplete => (destinationRef.current = autocomplete)}
              onPlaceChanged={() => {
                if (destinationRef.current) {
                  setDestination(
                    destinationRef.current.getPlace().formatted_address
                  )
                }
              }}
            >
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter destination station"
                required
              />
            </Autocomplete>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      ) : (
        <p>Loading Google Maps...</p>
      )}

      {loading && (
        <div className="flex items-center justify-center mt-6">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {busdata.length > 0 && (
        <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {busdata.map((bus, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
              onClick={() => handleCardClick(bus)}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {bus.vehicle_number}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Departure Time:</strong>{" "}
                {bus.stations[0]?.departureTime || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Arrival Time:</strong>{" "}
                {bus.stations[0]?.arrivalTime || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default KsrtcBus
