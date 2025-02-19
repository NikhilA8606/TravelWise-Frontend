import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useRoute } from "@/context/RouteContext";

const center = { lat: 48.8584, lng: 2.2945 };
const libraries = ["places"];

const Map = () => {
  const {
    setDistance,
    setDuration,
    setNearestStation,
    distance,
    duration,
    nearestStation,
    setSource,
    setDestination,
    intermediateStations,
    setIntermediateStations,
    setBusrate,
    setTaxirate,
    setDriverate,
    setDetailsLoading,
  } = useRoute();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOMAPS_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

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
    return (
      <Flex justify="center" align="center" h="100vh" w="70vw">
        <Spinner size="xl" thickness="4px" color="pink.500" />
      </Flex>
    );
  }

  function calculateBusFare(distanceInKm) {
    const MIN_FARE = 10;
    const BASE_DISTANCE = 2.5;
    const PER_KM_RATE = 1;

    if (distanceInKm <= BASE_DISTANCE) {
      return MIN_FARE;
    }

    const additionalDistance = distanceInKm - BASE_DISTANCE;
    const additionalFare = additionalDistance * PER_KM_RATE;
    const totalFare = MIN_FARE + additionalFare;

    return Math.ceil(totalFare);
  }

  function calculateTaxiFare(distanceInKm) {
    const MIN_FARE = 30;
    const BASE_DISTANCE = 1.5;
    const PER_KM_RATE = 15;

    if (distanceInKm <= BASE_DISTANCE) {
      return MIN_FARE;
    }

    const additionalDistance = distanceInKm - BASE_DISTANCE;
    const additionalFare = additionalDistance * PER_KM_RATE;
    const totalFare = MIN_FARE + additionalFare;

    return Math.ceil(totalFare);
  }

  function calculateDriverRate(distanceInKm) {
    const FUEL_PRICE_PER_LITER = 110;
    const AVERAGE_MILEAGE = 15;

    const fuelCost = (distanceInKm / AVERAGE_MILEAGE) * FUEL_PRICE_PER_LITER;
    return Math.ceil(fuelCost);
  }

  async function calculateRoute(retryCount = 3) {
    try {
      setDetailsLoading(true);
      const origin = originRef.current.value.trim();
      const destination = destinationRef.current.value.trim();
      if (origin === "" || destination === "") return;

      setSource(origin);
      setDestination(destination);
      nearestStation.origin = await findNearestStation(originRef);
      nearestStation.destination = await findNearestStation(destinationRef);

      if (
        !origin.includes(nearestStation.origin) &&
        !destination.includes(nearestStation.destination)
      ) {
        setIntermediateStations(true);
      }

      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);

      // Extract numerical distance value from the string (e.g., "10 km" => 10)
      const distanceValue = parseFloat(results.routes[0].legs[0].distance.text);

      // Calculate and set bus and taxi fares
      const busFare = calculateBusFare(distanceValue);
      const taxiFare = calculateTaxiFare(distanceValue);
      const driverFare = calculateDriverRate(distanceValue);

      setBusrate(busFare);
      setTaxirate(taxiFare);
      setDriverate(driverFare);

      // Log the bus and taxi fares
      console.log("busrate:", busFare);
      console.log("taxirate:", taxiFare);
      console.log("driverRate:", driverFare);
      setDetailsLoading(false);
    } catch (error) {
      console.error("Directions request failed", error);
      if (retryCount > 0) {
        console.log(`Retrying... (${3 - retryCount + 1})`);
        calculateRoute(retryCount - 1);
      }
      setDetailsLoading(false);
    } finally {
      setDetailsLoading(false);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setNearestStation("");
    setBusrate("");
    setTaxirate("");
    setDriverate("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  const fetchNearbyRailwayStations = async (location) => {
    const apiKey = import.meta.env.VITE_GOMAPS_API_KEY; // Replace with your API key
    const radius = 20000;
    const type = "train_station";

    const url = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching nearby railway stations:", error);
      return [];
    }
  };

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

  const findNearestStation = async (loc) => {
    const locationInput = loc.current.value.trim();
    if (!locationInput) return;

    try {
      const location = await geocodeLocation(locationInput);
      console.log("Location:", location.lat(), location.lng());
      const stations = await fetchNearbyRailwayStations({
        lat: location.lat(),
        lng: location.lng(),
      });

      if (stations.length === 0) {
        console.error("No railway stations found nearby.");
        return;
      }

      const nearestStation = stations[0];

      return nearestStation.name;
    } catch (error) {
      console.error("Error finding nearest station:", error);
    }
  };

  return (
    <Flex
      position="relative"
      h="100vh"
      w="70vw"
      ml="auto"
      flexDirection="column"
      alignItems="center"
    >
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
      </Box>
      <Box h="100%" w="100%">
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
    </Flex>
  );
};

export default Map;
