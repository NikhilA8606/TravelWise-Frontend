import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrain, FaTaxi, FaBus, FaBed, FaArrowRight } from "react-icons/fa";
import { Card } from "@/components/ui/card";

const Navbar = ({ prop: { way, rate, source, destination, routeData } }) => {
  const navigate = useNavigate();
  const { route_type, start_station, end_station } = routeData;

  const getHeading = (way) => {
    if (way === "Train") return "Available Routes";
    if (way === "Taxi") return "Taxi";
    if (way === "Drive") return "Drive";
    return "";
  };

  const renderTransportIcon = (type) => {
    switch (type) {
      case "train":
        return <FaTrain className="text-blue-500 text-lg mb-7" />;
      case "taxi":
        return <FaTaxi className="text-yellow-500 text-lg mb-7" />;
      case "private_bus":
      case "ksrtc_bus":
        return <FaBus className="text-green-500 text-lg mb-7" />;
      default:
        return null;
    }
  };

  const handleCardClick = (type, from, to) => {
    let path = "/";
    if (type === "private_bus") path = "/bus";
    else if (type === "ksrtc_bus") path = "/ksrtc";
    else if (type === "train") path = "/railway";

    navigate(path, { state: { start: from, end: to } });
  };

  const renderCard = (type, from, to, label) => (
    <div
      className="p-4 mt-4 relative bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 transition"
      onClick={() => handleCardClick(type, from, to)}
    >
      <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-gray-500"></div>
      <div className="flex items-center gap-2">
        {renderTransportIcon(type)}
        <div className="ml-3">
          <h3 className="font-semibold">{from}</h3>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
      <p className="text-gray-700 mt-2 ml-9">{type} • On demand</p>
      <p className="text-gray-700 mt-2 ml-9">{rate}</p>
      <div className="mt-4 flex items-center gap-2">
        <div>
          <h3 className="font-semibold ml-9">{to}</h3>
          <p className="text-sm text-gray-500 ml-9">{to}, India</p>
          <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-yellow-500 bg-white rounded-full"></div>
        </div>
      </div>
      {type === "train" && (
        <a
          href="https://www.irctc.co.in/nget/train-search"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500  mt-2 block ml-9"
        >
          Book Now?
        </a>
      )}
    </div>
  );

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-bold mb-4">{getHeading(way)}</h2>

      {way === "Train" ? (
        <>
          {["private_bus", "ksrtc_bus", "taxi"].includes(route_type[0]) &&
            renderCard(
              route_type[0],
              source,
              start_station.station_name,
              "Start Station"
            )}

          {renderCard(
            "train",
            start_station.station_name,
            end_station.station_name,
            "Train Journey"
          )}

          {["private_bus", "ksrtc_bus", "taxi"].includes(
            route_type[route_type.length - 1]
          ) &&
            renderCard(
              route_type[route_type.length - 1],
              end_station.station_name,
              destination,
              "Destination"
            )}
        </>
      ) : way === "Taxi" || way === "Drive" ? (
        renderCard("taxi", source, destination, "Local Station")
      ) : null}

      {/* Fixed Card */}
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
                target="_blank"
                rel="noopener noreferrer"
              >
                Find Hotels
              </a>
              <FaArrowRight className="text-pink-500 ml-1 mt-1" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Navbar;
