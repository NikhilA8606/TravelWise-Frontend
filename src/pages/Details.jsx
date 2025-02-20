import { Button } from "@components/ui/button";
import Navbar from "./Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@components/ui/card";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaTrain, FaBus, FaTaxi, FaCar } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRoute } from "../context/RouteContext";
import axios from "axios";
import { useState } from "react";
import Directroute from "./Directroute";

const options = [
  {
    type: "Train",
    icon: <FaTrain className="text-purple-700 text-2xl" />,
    price: "₹130–800",
    label: "BEST",
  },
  {
    type: "Private Bus",
    icon: <FaBus className="text-orange-600 text-2xl" />,
    price: "",
    label: "CHEAPEST",
  },
  {
    type: "KSRTC Bus",
    icon: <FaBus className="text-orange-600 text-2xl" />,
    price: "",
    label: "CHEAPEST",
  },
  {
    type: "Taxi",
    icon: <FaTaxi className="text-yellow-500 text-2xl" />,
    price: "",
    label: "",
  },
  {
    type: "Drive",
    icon: <FaCar className="text-gray-600 text-2xl" />,
    price: "",
    label: "",
  },
];

const Details = () => {
  const {
    destination,
    source,
    distance,
    duration,
    busrate,
    taxirate,
    bustime,
    driverate,
    detailsLoading,
  } = useRoute();
  const [busdata, setBusdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prop, setProp] = useState({});

  options[1].price = `₹${busrate}`;
  options[3].price = `₹${taxirate}`;
  options[4].price = `₹${driverate}`;

  const [ksrtcdata, setKsrtcdata] = useState([]);
  useEffect(() => {
    const fetchBusData = async () => {
      if (!source || !destination) return;
      setLoading(true);
      setError(null);
      try {
        const sourceName = source.split(",")[0].toLowerCase().trim();
        const destName = destination.split(",")[0].toLowerCase().trim();
        const response = await axios.get(
          `https://busapi.amithv.xyz/api/v1/schedules?departure=${sourceName}&destination=${destName}`
        );

        console.log("ksrtcdata", ksrtcdata);
        setBusdata(response.data);
      } catch (err) {
        setBusdata(null);
        console.error("Error fetching bus schedules:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusData();
  }, [source, destination]);

  const filteredOptions = options.filter((option) => {
    if (busdata?.length > 0 && ksrtcdata?.length > 0) {
      return option.type !== "Train";
    }
    if (busdata?.length > 0) {
      return option.type !== "KSRTC Bus" && option.type !== "Train";
    }
    if (!busdata?.length && !ksrtcdata?.length) {
      return option.type !== "KSRTC Bus" && option.type !== "Private Bus";
    }
    if (!busdata?.length) {
      return option.type !== "Private Bus";
    }
    return true;
  });

  if (!source || !destination)
    return (
      <div className="space-y-4 p-3 w-full max-w-full flex items-center justify-center">
        <h1 className="text-muted-foreground">
          Enter the source and destination
        </h1>
      </div>
    );

  if (detailsLoading)
    return (
      <div className="space-y-4 p-3 w-full max-w-full flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="space-y-4 p-3 w-full max-w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Ways to travel to {destination}
      </h2>
      <Sheet>
        <SheetTrigger className="block w-full">
          <div className="space-y-4">
            {filteredOptions.map((option, index) => (
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
          {busdata?.length > 0 ? (
            <Directroute prop={prop} />
          ) : prop.way === "Train" ? (
            <Navbar />
          ) : ["Private Bus", "KSRTC Bus", "Taxi", "Drive"].includes(
              prop.way
            ) ? (
            <Directroute prop={prop} />
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Details;
