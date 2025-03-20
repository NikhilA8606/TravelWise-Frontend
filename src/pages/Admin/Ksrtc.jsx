import { useEffect, useState } from "react"
import API from "../../lib/api"
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
import { Pencil, Trash, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const KsrtcTrips = () => {
  const [trips, setTrips] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [tripData, setTripData] = useState({
    vehicle_number: "",
    trip: "",
    stations: [],
  })
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await API.get("/ksrtc/")
      setTrips(response.data)
    } catch (error) {
      console.error("Error fetching trips:", error)
    }
  }

  const handleAddStation = () => {
    setTripData({
      ...tripData,
      stations: [
        ...tripData.stations,
        { station: "", arrivalTime: "", departureTime: "" },
      ],
    })
  }

  const handleStationChange = (index, field, value) => {
    const updatedStations = tripData.stations.map((station, i) =>
      i === index ? { ...station, [field]: value } : station
    )
    setTripData({ ...tripData, stations: updatedStations })
  }

  const handleDeleteStation = index => {
    const updatedStations = tripData.stations.filter((_, i) => i !== index)
    setTripData({ ...tripData, stations: updatedStations })
  }

  const handleAddOrEditTrip = async () => {
    try {
      if (editMode) {
        await API.put(`/ksrtc/${tripData.id}/`, tripData)
      } else {
        // Get the user ID from localStorage
        const userId = localStorage.getItem("userId")
        if (!userId) {
          throw new Error("User ID not found. Please log in again.")
        }

        // Include the user ID in the trip data
        const tripDataWithUser = {
          ...tripData,
          user: userId,
        }

        await API.post("/ksrtc/", tripDataWithUser)
      }

      fetchTrips()
      setOpenModal(false)
      setTripData({ vehicle_number: "", trip: "", stations: [] })
      setEditMode(false)
    } catch (error) {
      console.error("Error saving trip:", error)
      // You might want to show an error message to the user
    }
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            KSRTC Bus Trips
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => {
              setOpenModal(true)
              setEditMode(false)
              setTripData({ vehicle_number: "", trip: "", stations: [] })
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Trip
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map(trip =>
              trip.stations.map((station, index) => (
                <TableRow key={`${trip.id}-${index}`}>
                  {index === 0 && (
                    <>
                      <TableCell rowSpan={trip.stations.length}>
                        {trip.id}
                      </TableCell>
                      <TableCell rowSpan={trip.stations.length}>
                        {trip.vehicle_number}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{station.station}</TableCell>
                  <TableCell>{station.arrivalTime}</TableCell>
                  <TableCell>{station.departureTime}</TableCell>
                  {index === 0 && (
                    <TableCell
                      rowSpan={trip.stations.length}
                      className="flex gap-2"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setTripData(trip)
                          setOpenModal(true)
                          setEditMode(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Trip" : "Add New Trip"}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Vehicle Number"
            value={tripData.vehicle_number}
            onChange={e =>
              setTripData({ ...tripData, vehicle_number: e.target.value })
            }
          />
          <Input
            placeholder="Trip"
            value={tripData.trip}
            onChange={e => setTripData({ ...tripData, trip: e.target.value })}
          />
          {tripData.stations.map((station, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Station Name"
                value={station.station}
                onChange={e =>
                  handleStationChange(index, "station", e.target.value)
                }
              />
              <Input
                placeholder="Arrival Time"
                value={station.arrivalTime}
                onChange={e =>
                  handleStationChange(index, "arrivalTime", e.target.value)
                }
              />
              <Input
                placeholder="Departure Time"
                value={station.departureTime}
                onChange={e =>
                  handleStationChange(index, "departureTime", e.target.value)
                }
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleteStation(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button onClick={handleAddStation}>
            <Plus className="h-4 w-4 mr-2" /> Add Station
          </Button>
          <Button onClick={handleAddOrEditTrip} className="mt-2">
            {editMode ? "Save Changes" : "Add Trip"}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default KsrtcTrips
