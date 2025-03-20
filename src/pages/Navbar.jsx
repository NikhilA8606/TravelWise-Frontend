import React from "react";
import { FaTrain, FaTaxi, FaBus } from "react-icons/fa";

const Navbar = ({ prop: { way, rate, source, destination, routeData } }) => {
  const { route_type, start_station, end_station } = routeData;

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

  const renderCard = (type, from, to, label) => {
    return (
      <div className="p-4 mt-4 relative bg-white shadow-md rounded-lg">
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
      </div>
    );
  };

  if (way === "Train") {
    return (
      <div className="h-full overflow-y-auto scrollbar-hide">
        {" "}
        {/* Full-height scrollable container */}
        {/* Source to Start Station */}
        {route_type[0] === "private_bus" ||
        route_type[0] === "ksrtc_bus" ||
        route_type[0] === "taxi"
          ? renderCard(
              route_type[0],
              source,
              start_station.station_name,
              "Start Station"
            )
          : null}
        {/* Start Station to End Station */}
        {renderCard(
          "train",
          start_station.station_name,
          end_station.station_name,
          "Train Journey"
        )}
        {/* End Station to Destination */}
        {route_type[route_type.length - 1] === "private_bus" ||
        route_type[route_type.length - 1] === "ksrtc_bus" ||
        route_type[route_type.length - 1] === "taxi"
          ? renderCard(
              route_type[route_type.length - 1],
              end_station.station_name,
              destination,
              "Destination"
            )
          : null}
      </div>
    );
  } else if (way === "Taxi" || way === "Drive") {
    return (
      <div className="p-4 mt-4 relative bg-white shadow-md rounded-lg">
        <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-yellow-500"></div>
        <div className="flex items-center gap-2">
          <FaTaxi className="text-yellow-500 text-lg mb-7" />
          <div className="ml-3">
            <h3 className="font-semibold">{source}</h3>
            <p className="text-sm text-gray-500">Local Station</p>
          </div>
        </div>
        <p className="text-gray-700 mt-2 ml-9">{rate}</p>
        <div className="mt-4 flex items-center gap-2">
          <div>
            <h3 className="font-semibold ml-9">{destination}</h3>
            <p className="text-sm text-gray-500 ml-9">{destination}, India</p>
            <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-yellow-500 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
