import { useEffect, useState } from "react";
import API from "../../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Plus } from "lucide-react";

const KsrtcTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const response = await API.get("/ksrtc/");
      setTrips(response.data);
      setFilteredTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("ksrtc data: ", trips);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await API.get("/ksrtc/", {
        params: { source, destination },
      });
      setFilteredTrips(response.data);
    } catch (error) {
      console.error("Error filtering trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    setLoading(true);
    try {
      await API.delete(`/ksrtc/${id}/`);
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
      setFilteredTrips((prev) => prev.filter((trip) => trip.id !== id));
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            KSRTC Bus Trips
          </CardTitle>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Trip
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
              <TableHead>Station</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrips.map((trip) =>
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
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(trip.id)}
                      >
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
    </Card>
  );
};

export default KsrtcTrips;
