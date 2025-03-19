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

const KsrtcTrips = () => {
  const [trips, setTrips] = useState([])
  const [filteredTrips, setFilteredTrips] = useState([])
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    setLoading(true)
    try {
      const response = await API.get("/ksrtc/")
      setTrips(response.data)
      setFilteredTrips(response.data)
    } catch (error) {
      console.error("Error fetching trips:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await API.get("/ksrtc/", {
        params: { source, destination },
      })
      setFilteredTrips(response.data)
    } catch (error) {
      console.error("Error filtering trips:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    if (!confirm("Are you sure you want to delete this trip?")) return
    setLoading(true)
    try {
      await API.delete(`/ksrtc/${id}/`)
      setTrips(prev => prev.filter(trip => trip.id !== id))
      setFilteredTrips(prev => prev.filter(trip => trip.id !== id))
    } catch (error) {
      console.error("Error deleting trip:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            KSRTC Bus Trips
          </CardTitle>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrips.map(trip => (
              <TableRow key={trip.id}>
                <TableCell>{trip.id}</TableCell>
                <TableCell>{trip.vehicle_number}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(trip.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default KsrtcTrips
