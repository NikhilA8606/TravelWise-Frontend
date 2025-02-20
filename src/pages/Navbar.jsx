import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { FaTrain, FaTaxi, FaBed, FaArrowRight, FaBus } from "react-icons/fa";
import { useRoute } from "../context/RouteContext";
import axios from "axios";

const RouteCard = ({ from, to, duration, distance, isLast }) => (
  <Card className="p-4 mt-4 relative">
    <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-blue-500"></div>
    <div className="flex items-center gap-2">
      <FaTrain className="text-blue-500 text-lg mb-7" />
      <div className="ml-3">
        <h3 className="font-semibold">{from}</h3>
        <p className="text-sm text-gray-500">{from}, India</p>
      </div>
    </div>
    <p className="text-gray-700 mt-2 ml-9">
      {duration} • Train • {distance}
    </p>

    <p className="text-gray-700 mt-2 ml-9">₹210–3,400</p>
    <div className="mt-4 ml-9">
      <h3 className="font-semibold">{to}</h3>
      <p className="text-sm text-gray-500">{to}, India</p>
      <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-blue-500 bg-white rounded-full"></div>
      <a
        href="https://www.irctc.co.in/nget/train-search"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold hover:text-red-500 transition duration-200"
      >
        Book Now
      </a>
    </div>
  </Card>
);

const TaxiCard = ({ from, to }) => (
  <Card className="p-4 mt-4 relative">
    <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-yellow-500"></div>
    <div className="flex items-center gap-2">
      <FaTaxi className="text-yellow-500 text-lg mb-7" />
      <div className="ml-3">
        <h3 className="font-semibold">{from}</h3>
        <p className="text-sm text-gray-500">Local Station</p>
      </div>
    </div>
    <p className="text-gray-700 mt-2 ml-9">7min • Taxi • On demand • 5.1 km</p>
    <p className="text-gray-700 mt-2 ml-9">₹420–500</p>
    <div className="mt-4 flex items-center gap-2">
      <div>
        <h3 className="font-semibold ml-9">{to}</h3>
        <p className="text-sm text-gray-500 ml-9">{to}, India</p>
        <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-yellow-500 bg-white rounded-full"></div>
      </div>
    </div>
  </Card>
);

const BusCard = ({ from, to }) => (
  <Card className="p-4 mt-4 relative">
    <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-green-500"></div>
    <div className="flex items-center gap-2">
      <FaBus className="text-green-500 text-lg mb-7" />
      <div className="ml-3">
        <h3 className="font-semibold">{from}</h3>
        <p className="text-sm text-gray-500">Private Bus Service</p>
      </div>
    </div>
    <p className="text-gray-700 mt-2 ml-9">30min • Bus • AC Seater • 15 km</p>
    <p className="text-gray-700 mt-2 ml-9">₹100–150</p>
    <div className="mt-4 ml-9">
      <h3 className="font-semibold">{to}</h3>
      <p className="text-sm text-gray-500">{to}, India</p>
      <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-green-500 bg-white rounded-full"></div>
      <button className="text-green-600 font-semibold hover:text-red-500 transition duration-200">
        Book Now
      </button>
    </div>
  </Card>
);

const RouteNavigator = () => {
  const { distance, duration, nearestStation, source, destination } =
    useRoute();
  const navigate = useNavigate();
  const [originBusData, setOriginBusData] = useState(null);
  const [destBusData, setDestBusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusData = async () => {
      if (!source || !destination || !nearestStation) return;

      setLoading(true);
      setError(null);

      try {
        const sourceName = source.split(",")[0].toLowerCase().trim();
        const destName = destination.split(",")[0].toLowerCase().trim();

        // Check for bus availability from source to nearest station
        const originResponse = await axios.get(
          `https://busapi.amithv.xyz/api/v1/schedules?departure=${sourceName}&destination=${nearestStation.origin}`
        );
        setOriginBusData(originResponse.data);

        // Check for bus availability from last station to destination
        const destResponse = await axios.get(
          `https://busapi.amithv.xyz/api/v1/schedules?departure=${nearestStation.destination}&destination=${destName}`
        );
        setDestBusData(destResponse.data);
      } catch (err) {
        setError("Failed to fetch bus schedules");
        console.error("Error fetching bus schedules:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, [source, destination, nearestStation]);

  const handleHotelSearch = (data) => {
    if (data) {
      navigate("/hotels", { state: { data } });
    } else {
      console.error("No destination data available");
    }
  };

  const renderRouteCards = () => {
    const hasOriginStation =
      nearestStation?.origin && !source.includes(nearestStation.origin);
    const hasDestStation =
      nearestStation?.destination &&
      !destination.includes(nearestStation.destination);

    if (
      source.includes(nearestStation?.origin) &&
      destination.includes(nearestStation?.destination)
    ) {
      return (
        <RouteCard
          from={source}
          to={destination}
          duration={duration}
          distance={distance}
        />
      );
    }

    return (
      <>
        {hasOriginStation &&
          (originBusData?.length > 0 ? (
            <BusCard from={source} to={nearestStation.origin} />
          ) : (
            <TaxiCard from={source} to={nearestStation.origin} />
          ))}

        <RouteCard
          from={nearestStation?.origin || source}
          to={nearestStation?.destination || destination}
          duration={duration}
          distance={distance}
        />

        {hasDestStation &&
          (destBusData?.length > 0 ? (
            <BusCard from={nearestStation.destination} to={destination} />
          ) : (
            <TaxiCard from={nearestStation.destination} to={destination} />
          ))}
      </>
    );
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Route</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="p-3 -ml-2 max-w-lg mx-auto overflow-y-scroll h-screen">
        <h2 className="text-xl font-semibold">Available Routes</h2>
        <p className="text-gray-600">Train • {duration} • ₹631–3,818</p>

        {loading && <p className="mt-4 text-gray-600">Loading routes...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {!loading && !error && renderRouteCards()}

        <Card className="p-2 pb-10 mt-4 relative">
          <div className="flex items-center gap-2">
            <FaBed className="text-yellow-500 text-lg mb-5" />
            <div className="pl-2">
              <h3 className="font-semibold">Staying in {destination}?</h3>
              <button className="flex items-center">
                <span className="font-normal text-pink-500 text-base">
                  <a
                    href={`https://www.booking.com/searchresults.html?ss=${destination}%2C+India`}
                  >
                    Find Hotels
                  </a>
                </span>
                <FaArrowRight className="text-pink-500 ml-1 mt-1" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RouteNavigator;
