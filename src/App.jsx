import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import Details from "@pages/Details";
import Sign from "@pages/Sign";
import Admin from "@pages/Admin/Admin";
import PrivateBus from "@pages/TripDetails/PrivateBus";
import PrivateBusRoute from "@pages/Route/PrivateBusRoute";
import IndianRailway from "@pages/TripDetails/IndianRailway";
import TrainRoute from "@pages/Route/TrainRoute";

import { useState } from "react";
import KsrtcBus from "@pages/TripDetails/KsrctBus";

function App() {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [nearestStation, setNearestStation] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/sign" element={<Sign />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/"
          element={
            <div className="flex">
              <Map
                distance={distance}
                duration={duration}
                nearestStation={nearestStation}
                setDistance={setDistance}
                setDuration={setDuration}
                setNearestStation={setNearestStation}
              />
              <Details
                distance={distance}
                duration={duration}
                nearestStation={nearestStation}
              />
            </div>
          }
        />
        <Route path="/bus" element={<PrivateBus />} />
        <Route path="/ksrtc" element={<KsrtcBus />} />
        <Route path="/privatebusroute" element={<PrivateBusRoute />} />
        <Route path="/trainroute" element={<TrainRoute />} />
        <Route path="/railway" element={<IndianRailway />} />
      </Routes>
    </div>
  );
}

export default App;
