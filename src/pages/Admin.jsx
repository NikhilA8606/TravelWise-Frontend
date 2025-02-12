import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Input } from "@chakra-ui/react";

const Admin = () => {
  const [busTrips, setBusTrips] = useState([]);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [newTrip, setNewTrip] = useState({
    vehicle_number: "",
    trip: "",
    stations: [{ station: "", arrivalTime: "", departureTime: "" }],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchBusTrips();
  }, []);

  const fetchBusTrips = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/bus-trips/", {
        params: {
          source,
          destination,
        },
      });
      setBusTrips(response.data);
    } catch (error) {
      console.error("Error fetching bus trips:", error);
      setError("Failed to load bus trips. Please try again.");
    }
  };

  const handleAddTrip = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/bus-trips/", newTrip);
      fetchBusTrips();
      setNewTrip({
        vehicle_number: "",
        trip: "",
        stations: [{ station: "", arrivalTime: "", departureTime: "" }],
      });
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  const handleDeleteTrip = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/bus-trips/${id}/`);
      fetchBusTrips();
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const handleEditTrip = async (id) => {
    const updatedTrip = busTrips.find((trip) => trip.id === id);
    if (!updatedTrip) return;
    try {
      await axios.put(`http://127.0.0.1:8000/bus-trips/${id}/`, updatedTrip);
      fetchBusTrips();
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const filteredTrips = busTrips.filter((trip) =>
    source && destination
      ? trip.stations.some(
          (station) => station.station.toLowerCase() === source.toLowerCase()
        ) &&
        trip.stations.some(
          (station) =>
            station.station.toLowerCase() === destination.toLowerCase()
        )
      : true
  );

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100 p-4">
      <Card className="p-6 w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-auto">
        <h2 className="text-center text-xl font-semibold mb-4 text-gray-700">
          Bus Trip Details
        </h2>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <Input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Vehicle Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Trip</th>
                <th className="border border-gray-300 px-4 py-2">Stations</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {trip.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {trip.vehicle_number}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {trip.trip}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <ul>
                      {trip.stations.map((station, index) => (
                        <li key={index} className="text-sm">
                          <strong>{station.station}</strong> - Arrival:{" "}
                          {station.arrivalTime}, Departure:{" "}
                          {station.departureTime}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEditTrip(trip.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3 className="text-center text-lg font-semibold my-4 text-gray-700">
          Add New Trip
        </h3>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Vehicle Number"
            value={newTrip.vehicle_number}
            onChange={(e) =>
              setNewTrip({ ...newTrip, vehicle_number: e.target.value })
            }
          />
          <Input
            placeholder="Trip Name"
            value={newTrip.trip}
            onChange={(e) => setNewTrip({ ...newTrip, trip: e.target.value })}
          />
          <Input
            placeholder="Station Name"
            value={newTrip.stations[0].station}
            onChange={(e) =>
              setNewTrip({
                ...newTrip,
                stations: [{ ...newTrip.stations[0], station: e.target.value }],
              })
            }
          />
          <Input
            placeholder="Arrival Time"
            value={newTrip.stations[0].arrivalTime}
            onChange={(e) =>
              setNewTrip({
                ...newTrip,
                stations: [
                  { ...newTrip.stations[0], arrivalTime: e.target.value },
                ],
              })
            }
          />
          <Input
            placeholder="Departure Time"
            value={newTrip.stations[0].departureTime}
            onChange={(e) =>
              setNewTrip({
                ...newTrip,
                stations: [
                  { ...newTrip.stations[0], departureTime: e.target.value },
                ],
              })
            }
          />
          <Button colorScheme="green" onClick={handleAddTrip}>
            Add Trip
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Admin;
