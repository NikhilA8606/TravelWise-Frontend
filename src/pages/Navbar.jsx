import React from "react";
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
import {
  FaTrain,
  FaTaxi,
  FaLocationArrow,
  FaBed,
  FaArrowRight,
} from "react-icons/fa";


const Navbar = () => {
  const navigate = useNavigate();
  const handleCardClick = data => {
    if (data) {
      navigate("/hotels", {
        state: { data },
      })
    } else {
      setError("No station data available for the selected bus.")
    }
  }
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
        <h2 className="text-xl font-semibold">Train</h2>
        <p className="text-gray-600">6h 34min • ₹631–3,818</p>

        <Card className="p-4 mt-4 relative">
          <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-blue-500"></div>
          <div className="flex items-center gap-2 ">
            <FaTrain className="text-blue-500 text-lg mb-7 " />
            <div className="ml-3">
              <h3 className="font-semibold">Chengannur</h3>
              <p className="text-sm text-gray-500">Chengannur, India</p>
            </div>
          </div>
          <p className="text-gray-700 mt-2 ml-9">
            6h 27min • Train • 3 times a day
          </p>
          <div className="flex gap-2 mt-2 ml-9">
            {[16347, 16629, 16650].map((trainNo) => (
              <span
                key={trainNo}
                className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
              >
                {trainNo}
              </span>
            ))}
          </div>
          <p className="text-gray-700 mt-2 ml-9">₹210–3,400</p>
          <div className="mt-4 ml-9">
            <h3 className="font-semibold">Ferok</h3>
            <p className="text-sm text-gray-500">Kozhikode</p>
            <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-blue-500 bg-white rounded-full"></div>
            <a
              href="https://www.irctc.co.in/nget/train-search"
              className="text-blue-600 font-semibold hover:text-red-500 transition duration-200"
            >
              Book Now?
            </a>
          </div>
        </Card>
        <Card className="p-4 mt-4 relative">
          <div className="absolute left-5 top-9 bottom-8 w-0.5 bg-yellow-500"></div>
          <div className="flex items-center gap-2 ">
            <FaTaxi className="text-yellow-500 text-lg  mb-7" />
            <div className="ml-3">
              <h3 className="font-semibold">Ferok</h3>
              <p className="text-sm text-gray-500">Kozhikode</p>
            </div>
          </div>
          <p className="text-gray-700 mt-2  ml-9">
            7min • Taxi • On demand • 5.1 km
          </p>
          <p className="text-gray-700 mt-2  ml-9">₹420–500</p>
          <div className="mt-4 flex items-center gap-2">
            <div>
              <h3 className="font-semibold  ml-9">Ramanattukara</h3>
              <p className="text-sm text-gray-500  ml-9">
                Ramanattukara, India
              </p>
              <div className="absolute left-4 bottom-7 w-2.5 h-2.5 border-2 border-yellow-500 bg-white rounded-full"></div>
            </div>
          </div>
        </Card>
        <Card className="p-2 mt-4 relative">
          <div className="flex items-center gap-2">
            <FaBed className="text-yellow-500 text-lg mb-5" />
            <div className="pl-2">
              <h3 className="font-semibold">Staying in Ramanattukara?</h3>
              <button
                className="flex items-center"
                onClick={() =>{handleCardClick("Ramanattukara")}}
              >
                <span className="font-normal text-pink-500 text-base">
                  Find Hotels
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

export default Navbar;
