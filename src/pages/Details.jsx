import { Button } from "@components/ui/button";
import Navbar from "./Navbar";
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

const Details = ({ distance, duration, nearestStation }) => {
  return (
    <div className="space-y-4 p-3 w-[40vw]">
      <h2 className="text-2xl font-semibold mb-4">5 ways to travel to Kochi</h2>
      <Sheet>
        {/* {travelOptions.map((option, index) => ( */}
        <SheetTrigger>
          <Card className="p-4 flex items-center shadow-md">
            <div className="text-2xl text-gray-700 mr-4">
              <FaTrain />
            </div>
            <div className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Train</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{duration}</p>
                {distance && <p>{distance}</p>}
              </CardContent>
            </div>
            <CardFooter className="text-right">
              <p className="text-pink-600 font-bold">50</p>

              <span className="text-green-600 font-semibold ml-2">BEST</span>
            </CardFooter>
          </Card>
        </SheetTrigger>
        {/* ))} */}
        <Button variant="outline" className="w-full mt-4">
          Show 1 more option
        </Button>
        <SheetContent>
          <Navbar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Details;
