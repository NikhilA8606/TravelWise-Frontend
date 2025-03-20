import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import irctc from "../../assets/irctc.png"
import train_stations from "../../constants/train"

const IndianRailway = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [trainData, setTrainData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { start, end } = location.state || {}

  const [source, setSource] = useState(start || "")
  const [destination, setDestination] = useState(end || "")
  const [sourceSuggestions, setSourceSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false)

  const sourceRef = useRef(null)
  const destinationRef = useRef(null)

  // Handle clicking outside suggestion boxes to close them
  useEffect(() => {
    const handleClickOutside = event => {
      if (sourceRef.current && !sourceRef.current.contains(event.target)) {
        setShowSourceSuggestions(false)
      }
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setShowDestinationSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter stations based on search input
  const filterStations = input => {
    const query = input.toLowerCase()
    return train_stations
      .filter(
        station =>
          station.station_code.toLowerCase().includes(query) ||
          station.station_name.toLowerCase().includes(query)
      )
      .slice(0, 8) // Limit to 8 suggestions for better UX
  }

  // Handle source input changes
  const handleSourceChange = e => {
    const value = e.target.value
    setSource(value)
    if (value.length > 0) {
      setSourceSuggestions(filterStations(value))
      setShowSourceSuggestions(true)
    } else {
      setSourceSuggestions([])
      setShowSourceSuggestions(false)
    }
  }

  // Handle destination input changes
  const handleDestinationChange = e => {
    const value = e.target.value
    setDestination(value)
    if (value.length > 0) {
      setDestinationSuggestions(filterStations(value))
      setShowDestinationSuggestions(true)
    } else {
      setDestinationSuggestions([])
      setShowDestinationSuggestions(false)
    }
  }

  // Select a suggestion for source
  const handleSelectSourceSuggestion = station => {
    setSource(station.station_code)
    setShowSourceSuggestions(false)
  }

  // Select a suggestion for destination
  const handleSelectDestinationSuggestion = station => {
    setDestination(station.station_code)
    setShowDestinationSuggestions(false)
  }

  const handleCardClick = train => {
    console.log(train)
    if (train && train.stations) {
      navigate("/trainroute", {
        state: { train, stations: train.stations },
      })
    } else {
      setError("No station data available for the selected train.")
    }
  }

  const handleSearch = async event => {
    event.preventDefault()

    if (!source || !destination) {
      setError("Please enter both source and destination station codes.")
      return
    }

    setError("")
    setLoading(true)
    setTrainData([])

    const options = {
      method: "GET",
      url: "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
      params: {
        fromStationCode: source,
        toStationCode: destination,
        dateOfJourney: "2025-01-17",
      },
      headers: {
        "x-rapidapi-key": "f4feda43a5msh59220e1f97cb7a2p1352b8jsned14e3c92a47",
        "x-rapidapi-host": "irctc1.p.rapidapi.com",
      },
    }

    try {
      const response = await axios.request(options)
      setTrainData(response.data.data || [])
    } catch (err) {
      setError("Failed to fetch train data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <img
        src={irctc}
        alt="IRCTC Logo"
        className="w-20 h-24 object-cover mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Train Schedule Finder
      </h1>
      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div ref={sourceRef} className="relative">
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Source Station Code
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={handleSourceChange}
            onClick={() => source && setShowSourceSuggestions(true)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by station code or name"
            required
          />
          {showSourceSuggestions && sourceSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {sourceSuggestions.map(station => (
                <li
                  key={station.id}
                  onClick={() => handleSelectSourceSuggestion(station)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  <span className="font-medium">{station.station_code}</span> -{" "}
                  {station.station_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div ref={destinationRef} className="relative">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700"
          >
            Destination Station Code
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
            onClick={() => destination && setShowDestinationSuggestions(true)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by station code or name"
            required
          />
          {showDestinationSuggestions && destinationSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {destinationSuggestions.map(station => (
                <li
                  key={station.id}
                  onClick={() => handleSelectDestinationSuggestion(station)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  <span className="font-medium">{station.station_code}</span> -{" "}
                  {station.station_name}
                </li>
              ))}
            </ul>
          )}
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
          {trainData.map(train => (
            <div
              key={train.train_number}
              onClick={() => handleCardClick(train)}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {train.train_name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Train Number:</strong> {train.train_number}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Departure:</strong> {train.from_sta}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Arrival:</strong> {train.to_std}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && trainData.length === 0 && !error && (
        <p className="mt-6 text-gray-500">No train data available.</p>
      )}
    </div>
  )
}

export default IndianRailway
