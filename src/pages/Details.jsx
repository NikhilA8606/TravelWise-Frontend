import { Button } from "@components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@components/ui/card";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaTrain, FaBus, FaTaxi, FaCar } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRoute } from "../context/RouteContext";
import Navbar from "../pages/Navbar";
import Directroute from "./Directroute";

const transportOptions = {
  train: {
    type: "Train",
    icon: <FaTrain className="text-purple-700 text-2xl" />,
    price: "₹130–800",
    label: "BEST",
  },
  private_bus: {
    type: "Private Bus",
    icon: <FaBus className="text-orange-600 text-2xl" />,
    price: "",
    label: "CHEAPEST",
  },
  taxi: {
    type: "Taxi",
    icon: <FaTaxi className="text-yellow-500 text-2xl" />,
    price: "",
    label: "",
  },
  drive: {
    type: "Drive",
    icon: <FaCar className="text-gray-600 text-2xl" />,
    price: "",
    label: "",
  },
};

const Details = () => {
  const {
    destination,
    source,
    duration,
    busrate,
    ksrtcrate,
    taxirate,
    driverate,
    detailsLoading,
  } = useRoute();
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prop, setProp] = useState({});

  useEffect(() => {
    const fetchRouteData = async () => {
      if (!source || !destination) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/best-route/?start=${source}&end=${destination}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        console.log("Details:", data.route_type);
        setRouteData(data);
      } catch (err) {
        setError("Failed to fetch route data. Please try again.");
        console.error("Error fetching route data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRouteData();
  }, [source, destination]);

  transportOptions.taxi.price = `₹${taxirate}`;
  transportOptions.drive.price = `₹${driverate}`;
  transportOptions.private_bus.price = `₹${busrate}`;

  if (!source || !destination)
    return (
      <div className="space-y-4 p-3 w-full max-w-full flex items-center justify-center">
        <h1 className="text-muted-foreground">
          Enter the source and destination
        </h1>
      </div>
    );

  if (detailsLoading || loading)
    return (
      <div className="space-y-4 p-3 w-full max-w-full flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="space-y-4 p-3 w-full max-w-full flex items-center justify-center">
        <h1 className="text-muted-foreground">{error}</h1>
      </div>
    );

  // Determine which cards to show based on route_type
  const selectedCards = [];
  if (routeData?.route_type.includes("train")) {
    selectedCards.push(transportOptions.train);
  }
  if (
    routeData?.route_type.length === 1 &&
    routeData?.route_type[0] === "private_bus"
  ) {
    selectedCards.push(transportOptions.private_bus);
  }
  selectedCards.push(transportOptions.taxi);
  selectedCards.push(transportOptions.drive); // Drive card is always shown

  return (
    <div className="space-y-4 p-3 w-full max-w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Ways to travel to {destination}
      </h2>
      <Sheet>
        <SheetTrigger className="block w-full">
          <div className="space-y-4">
            {selectedCards.map((option, index) => (
              <Card
                key={index}
                className="p-3 w-full flex items-center rounded-xl shadow-sm border"
              >
                <div className="mr-4">{option.icon}</div>
                <div
                  onClick={() =>
                    setProp({
                      way: option.type,
                      rate: option.price,
                      source: source,
                      destination: destination,
                      routeData: routeData,
                    })
                  }
                >
                  <CardHeader className="p-0">
                    <CardTitle className="text-base font-bold">
                      {option.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-gray-600">
                    {duration}
                  </CardContent>
                </div>
                <CardFooter className="text-right">
                  {option.label && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md mr-2">
                      {option.label}
                    </span>
                  )}
                  <p className="text-pink-600 font-bold">{option.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SheetTrigger>
        <Button variant="outline" className="w-full mt-4">
          Show More Options
        </Button>
        <SheetContent>
          {routeData && routeData?.route_type.includes("train") ? (
            <Navbar prop={prop} />
          ) : routeData?.route_type.length === 1 &&
            routeData?.route_type[0] === "private_bus" ? (
            <Directroute prop={prop} />
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Details;
