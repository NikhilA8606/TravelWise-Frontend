import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Hotels = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Get the place data passed from the previous page

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      fetchHotels(data);
    }
  }, [data]);

  const fetchHotels = async (data) => {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        dest_id: '-2092174', // This should be dynamic based on the place
        search_type: {data},
        adults: '1',
        children_age: '0,17',
        room_qty: '1',
        page_number: '1',
        units: 'metric',
        temperature_unit: 'c',
        languagecode: 'en-us',
        currency_code: 'AED'
      },
      headers: {
        'x-rapidapi-key': 'f4feda43a5msh59220e1f97cb7a2p1352b8jsned14e3c92a47',
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setHotels(response.data.result); // Assuming response contains a 'result' field with hotel data
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch hotels.");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hotels in {data}</h1>
      {loading && <p>Loading hotels...</p>}
      {error && <p>{error}</p>}
      <div className="hotel-list">
        {hotels ? (
          hotels.map((hotel, index) => (
            <div key={index} className="hotel-item">
              <h2>{hotel.name}</h2>
              <p>{hotel.address}</p>
              {/* Add more hotel details based on the response */}
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
