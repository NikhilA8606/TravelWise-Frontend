import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import {
  FaTrain,
  FaBus,
  FaTaxi,
  FaLocationArrow,
  FaBed,
  FaArrowRight,
} from "react-icons/fa";
import { useRoute } from "../context/RouteContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Directroute = ({ prop: { way, rate } }) => {
  const navigate = useNavigate();
  const { destination, source, busrate, bustime, setBustime } = useRoute();
  const [busdata, setBusdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstStation, setFirstStation] = useState(null);

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
        setBusdata(response.data);
        if (response.data.length > 0 && response.data[0].stations?.length > 0) {
          setFirstStation(response.data[0].stations[0]);
        }
      } catch (err) {
        setError("Failed to fetch bus schedules");
      } finally {
        setLoading(false);
      }
    };
    fetchBusData();
  }, [source, destination]);

  const handleCardClick = (source, destination) => {
    if (source && destination) {
      navigate("/bus", {
        state: {
          start: source?.split(",")[0],
          end: destination?.split(",")[0],
        },
      });
    }
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  };

  const getArrivalAndReachingTime = (stations, source, destination) => {
    const sourceStation = stations.find(
      (station) => station.station === source.toUpperCase()
    );
    const destinationStation = stations.find(
      (station) => station.station === destination.toUpperCase()
    );

    if (sourceStation && destinationStation) {
      const sourceTimeInMinutes = parseTime(sourceStation.arrivalTime);
      const destinationTimeInMinutes = parseTime(
        destinationStation.arrivalTime
      );
      const totalTimeInMinutes = destinationTimeInMinutes - sourceTimeInMinutes;

      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = totalTimeInMinutes % 60;
      setBustime(`${hours} hrs ${minutes} mins`);
      return {
        total_time: `${hours} hrs ${minutes} mins`,
      };
    }
    return null;
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

      <div className="p-3 -ml-2 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold">{way}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          busdata.length > 0 && (
            <Card
              className="p-4 mt-4 relative"
              onClick={() => handleCardClick(source, destination)}
            >
              <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-blue-500"></div>
              <div className="flex items-center gap-2">
                <FaBus className="text-blue-500 text-lg mb-7" />
                <div className="ml-3">
                  <h3 className="font-semibold">{source}</h3>
                  <p className="text-sm text-gray-500">{source}, India</p>
                </div>
              </div>
              {busdata[0]?.stations && (
                <p className="text-gray-700 mt-2 ml-9">
                  {getArrivalAndReachingTime(
                    busdata[0].stations,
                    source?.split(",")[0],
                    destination?.split(",")[0]
                  )?.total_time || "Time unavailable"}
                </p>
              )}
              <p className="text-gray-700 mt-2 ml-9">{rate}rs</p>
              <div className="mt-4 ml-9">
                <h3 className="font-semibold">{destination}</h3>
                <p className="text-sm text-gray-500">{destination}, India</p>
              </div>
            </Card>
          )
        )}

        <Card className="p-2 mt-4 relative cursor-pointer">
          <div className="flex items-center gap-2">
            <FaBed className="text-yellow-500 text-lg mb-5" />
            <div className="pl-2">
              <h3 className="font-semibold">
                Staying in {destination?.split(",")[0]}?
              </h3>
              <button className="flex items-center">
                <a
                  href={`https://www.booking.com/searchresults.html?ss=${destination}%2C+India`}
                >
                  Find Hotels
                </a>    
                <FaArrowRight className="text-pink-500 ml-1 mt-1" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Directroute;
