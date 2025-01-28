import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const PrivateBus = () => {
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [busdata, setBusdata] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) // For loader
  const navigate = useNavigate()

  const parseTime = timeStr => {
    const [time, modifier] = timeStr.split(" ")
    let [hours, minutes] = time.split(":").map(Number)
    if (modifier.toLowerCase() === "pm" && hours !== 12) {
      hours += 12
    }
    if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0
    }
    return hours * 60 + minutes
  }

  const getArrivalAndReachingTime = (stations, source, destination) => {
    const sourceStation = stations.find(
      station => station.station === source.toUpperCase()
    )
    const destinationStation = stations.find(
      station => station.station === destination.toUpperCase()
    )

    if (sourceStation && destinationStation) {
      const sourceTimeInMinutes = parseTime(sourceStation.arrivalTime)
      const destinationTimeInMinutes = parseTime(destinationStation.arrivalTime)
      const totalTimeInMinutes = destinationTimeInMinutes - sourceTimeInMinutes

      const hours = Math.floor(totalTimeInMinutes / 60)
      const minutes = totalTimeInMinutes % 60

      return {
        arrival_time: sourceStation.arrivalTime,
        destination_time: destinationStation.arrivalTime,
        total_time: `${hours} hrs ${minutes} mins`,
      }
    }
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setLoading(true) // Start loader
    try {
      const { data } = await axios.get(
        `https://busapi.amithv.xyz/api/v1/schedules?departure=${source}&destination=${destination}`
      )
      setBusdata(data || [])
    } catch {
      setError(
        "Failed to fetch bus data. Please check your input and try again."
      )
    } finally {
      setLoading(false) // Stop loader
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Private Bus Schedule Finder
      </h1>
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
          <input
            type="text"
            id="source"
            value={source}
            onChange={e => setSource(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter source station"
            required
          />
        </div>
        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter destination station"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center mt-6">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {busdata.length > 0 && (
        <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {busdata.map((bus, index) => {
            const times = getArrivalAndReachingTime(
              bus.stations,
              source,
              destination
            )

            return times ? (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
                onClick={() => handleCardClick(bus)}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {bus.vehicle_number}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Departure Time:</strong> {times.arrival_time}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Arrival Time:</strong> {times.destination_time}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Time:</strong> {times.total_time}
                </p>
              </div>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}

export default PrivateBus
