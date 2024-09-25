import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const MapComponent = () => {
  const [mechanics, setMechanics] = useState([]);
  const center = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get('/api/mechanics');
        setMechanics(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    fetchMechanics();
  }, []);

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={center}
      >
        {mechanics.map(mechanic => (
          <Marker key={mechanic._id} position={{ lat: mechanic.location.lat, lng: mechanic.location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
