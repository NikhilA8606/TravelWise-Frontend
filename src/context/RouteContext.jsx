import { createContext, useContext, useState } from "react";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [busrate, setBusrate] = useState("");
  const [taxirate, setTaxirate] = useState("");
  const [driverate, setDriverate] = useState("");
  const [bustime, setBustime] = useState("");
  const [nearestStation, setNearestStation] = useState({
    origin: null,
    destination: null,
  });
  const [intermediateStations, setIntermediateStations] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);

  return (
    <RouteContext.Provider
      value={{
        distance,
        setDistance,
        bustime,
        setBustime,
        duration,
        setDuration,
        busrate,
        setBusrate,
        taxirate,
        setTaxirate,
        driverate,
        setDriverate,
        nearestStation,
        setNearestStation,
        source,
        setSource,
        destination,
        setDestination,
        intermediateStations,
        setIntermediateStations,
        detailsLoading,
        setDetailsLoading,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
