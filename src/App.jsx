import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import Details from "@pages/Details";
import Sign from "@pages/Sign";
import Admin from "@pages/Admin";
import PrivateBus from "@pages/TripDetails/PrivateBus";
import PrivateBusRoute from "@pages/Route/PrivateBusRoute";
import IndianRailway from "@pages/TripDetails/IndianRailway";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/sign" element={<Sign />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/"
          element={
            <div className="flex">
              <Map />
              <Details />
            </div>
          }
        />
        <Route path="/data" element={<PrivateBus />} />
        <Route path="/privatebus" element={<PrivateBusRoute />} />
        <Route path="/railway" element={<IndianRailway />} />
      </Routes>
    </div>
  );
}

export default App;
