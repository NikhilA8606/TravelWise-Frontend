import { Button } from "@components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@components/ui/card";
import React from "react";
import { FaTrain, FaBus, FaTaxi, FaCar } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


const travelOptions = [
  {
    mode: "Train",
    icon: <FaTrain className="text-blue-500" />,
    time: "2h 46min",
    price: "₹180–2,400",
    best: true,
    handleClick: () => {
      window.location.href = "/railway";
    }
  },
  {
    mode: "Bus",
    icon: <FaBus className="text-red-500" />,
    time: "5h 4min",
    price: "₹205–526",
    handleClick: () => {
      window.location.href = "/data";
    }
  },
  {
    mode: "Taxi",
    icon: <FaTaxi className="text-violet-500" />,
    time: "2h 55min",
    price: "₹4,300–5,500",
    handleClick: () => {
      window.location.href = "/";
    }
  },
  {
    mode: "Drive",
    icon: <FaCar className="text-lime-500" />,
    time: "2h 55min",
    price: "₹1,816–2,624",
    distance: "183 km",
    handleClick: () => {
      window.location.href = "/";
    }
  },
];

const Details = () => {
  return (
    <div className="space-y-4 p-3 w-full">
      <h2 className="text-2xl font-semibold mb-4">5 ways to travel to Kochi</h2>
      <Sheet>
        {travelOptions.map((option, index) => (
          <SheetTrigger asChild>
            <Card
              onClick={option.handleClick}
              key={index} className="p-4 flex items-center  shadow-md">
              <div className="text-2xl text-gray-700 mr-4">{option.icon}</div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    {option.mode}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{option.time}</p>
                  {option.distance && <p>{option.distance}</p>}
                </CardContent>
              </div>
              <CardFooter className="text-right">
                <p className="text-pink-600 font-bold">{option.price}</p>
                {option.best && (
                  <span className="text-green-600 font-semibold ml-2">
                    BEST
                  </span>
                )}
              </CardFooter>
            </Card>
          </SheetTrigger>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          Show 1 more option
        </Button>
      </Sheet>
    </div>
  );
};

export default Details;
