import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Trash, Plus } from "lucide-react"

const KsrtcTrips = () => {
  const [trips, setTrips] = useState([])
  const [filteredTrips, setFilteredTrips] = useState([])
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false) // Modal state

  const [newTrip, setNewTrip] = useState({
    vehicle_number: "",
    user: "",
    stations: [{ station: "", arrivalTime: "", departureTime: "" }],
  })

  const token = localStorage.getItem("authToken")

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true)
      try {
        const response = await axios.get("http://127.0.0.1:8000/bus-trips/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTrips(response.data)
        setFilteredTrips(response.data)
      } catch (error) {
        console.error("Error fetching bus trips:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrips()
  }, [token])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/bus-trips/", {
        headers: { Authorization: `Bearer ${token}` },
        params: { source, destination },
      })
      setFilteredTrips(response.data)
    } catch (error) {
      console.error("Error fetching bus trips:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    if (!confirm("Are you sure you want to delete this trip?")) return
    setLoading(true)
    try {
      await axios.delete(`http://127.0.0.1:8000/bus-trips/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTrips(prev => prev.filter(trip => trip.id !== id))
      setFilteredTrips(prev => prev.filter(trip => trip.id !== id))
    } catch (error) {
      console.error("Error deleting bus trip:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTrip = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/bus-trips/",
        newTrip,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setTrips([...trips, response.data])
      setFilteredTrips([...filteredTrips, response.data])
      setOpen(false)
    } catch (error) {
      console.error("Error adding bus trip:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStationChange = (index, field, value) => {
    const updatedStations = [...newTrip.stations]
    updatedStations[index][field] = value
    setNewTrip({ ...newTrip, stations: updatedStations })
  }

  const addStationField = () => {
    setNewTrip({
      ...newTrip,
      stations: [
        ...newTrip.stations,
        { station: "", arrivalTime: "", departureTime: "" },
      ],
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            KSRTC Bus Trips
          </CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trip</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Vehicle Number"
                  value={newTrip.vehicle_number}
                  onChange={e =>
                    setNewTrip({ ...newTrip, vehicle_number: e.target.value })
                  }
                />
                <Input
                  type="text"
                  placeholder="User"
                  value={newTrip.user}
                  onChange={e =>
                    setNewTrip({ ...newTrip, user: e.target.value })
                  }
                />
                <div className="border p-2 rounded">
                  <p className="font-semibold">Stations</p>
                  {newTrip.stations.map((station, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Station"
                        value={station.station}
                        onChange={e =>
                          handleStationChange(index, "station", e.target.value)
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Arrival Time"
                        value={station.arrivalTime}
                        onChange={e =>
                          handleStationChange(
                            index,
                            "arrivalTime",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Departure Time"
                        value={station.departureTime}
                        onChange={e =>
                          handleStationChange(
                            index,
                            "departureTime",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addStationField}>
                    + Add Station
                  </Button>
                </div>
                <Button onClick={handleAddTrip} disabled={loading}>
                  {loading ? "Adding..." : "Add Trip"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Source"
            value={source}
            onChange={e => setSource(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Stations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredTrips.length > 0 ? (
              filteredTrips.map(trip => (
                <TableRow key={trip.id}>
                  <TableCell>{trip.id}</TableCell>
                  <TableCell>{trip.vehicle_number}</TableCell>
                  <TableCell>{trip.user}</TableCell>
                  <TableCell>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Station</TableHead>
                          <TableHead>Arrival</TableHead>
                          <TableHead>Departure</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trip.stations.map((station, index) => (
                          <TableRow key={index}>
                            <TableCell>{station.station}</TableCell>
                            <TableCell>{station.arrivalTime}</TableCell>
                            <TableCell>{station.departureTime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(trip.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(trip.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No bus trips found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default KsrtcTrips
