import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };
const libraries = ["places"];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOMAPS_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [nearestStation, setNearestStation] = useState(null);

  const originRef = useRef();
  const destinationRef = useRef();
  const markerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && map && !markerRef.current) {
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: center,
          title: "Default Location",
        });
      } else {
        markerRef.current = new google.maps.Marker({
          map,
          position: center,
          title: "Default Location",
        });
        console.warn(
          "Falling back to google.maps.Marker as AdvancedMarkerElement is unavailable."
        );
      }
    }
  }, [isLoaded, map]);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute(retryCount = 3) {
    try {
      const origin = originRef.current.value.trim();
      const destination = destinationRef.current.value.trim();
      findNearestStation();
      if (origin === "" || destination === "") return;

      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      console.log(results.routes[0].legs[0]);

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error("Directions request failed", error);
      if (retryCount > 0) {
        console.log(`Retrying... (${3 - retryCount + 1})`);
        calculateRoute(retryCount - 1);
      }
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setNearestStation(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  // Fetch nearby railway stations
  const fetchNearbyRailwayStations = async (location) => {
    const apiKey = "AlzaSys3asb3bDSsEF-XH8pdE39mpqJ50bwodan"; // Replace with your API key
    const radius = 20000; // Search within 5 km
    const type = "train_station"; // Search for railway stations

    const url = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results; // Returns an array of nearby railway stations
    } catch (error) {
      console.error("Error fetching nearby railway stations:", error);
      return [];
    }
  };

  // Geocode the input location (convert address to lat/lng)
  const geocodeLocation = async (address) => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error("Geocoding failed"));
        }
      });
    });
  };

  // Find the nearest railway station and display it on the map
  const findNearestStation = async () => {
    const locationInput = destinationRef.current.value.trim();
    if (!locationInput) return;

    try {
      // Geocode the input location
      const location = await geocodeLocation(locationInput);
      console.log("Geocoded location:", location);

      // Fetch nearby railway stations
      const stations = await fetchNearbyRailwayStations({
        lat: location.lat(),
        lng: location.lng(),
      });

      if (stations.length === 0) {
        console.error("No railway stations found nearby.");
        return;
      }

      // Use the first railway station found (nearest one)
      console.log("Nearby railway stations:", stations);
      const nearestStation = stations[0];
      setNearestStation(nearestStation);

      // Place a marker at the nearest station
      if (map) {
        new google.maps.Marker({
          position: {
            lat: nearestStation.geometry.location.lat,
            lng: nearestStation.geometry.location.lng,
          },
          map,
        });
      }
    } catch (error) {
      console.error("Error finding nearest station:", error);
    }
  };
  return (
    <Flex
      position="relative"
      h="100vh"
      w="50vw" // Sets width to half of viewport, adjust as needed
      ml="auto" // Aligns to the right side of the page
      flexDirection="column"
      alignItems="center"
    >
      <Box position="absolute" top={0} left={0} h="100%" w="100%">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>

      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="clear route"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <Text>Nearest: {nearestStation?.name} </Text>

          <IconButton
            aria-label="center map"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default Map;
