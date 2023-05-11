import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
//googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
//
const MapContainer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA7SidJsAXk68zf7HXCtjzj1cltDuhbYkg'
    });
  
  if(!isLoaded) return <div>Loading...</div>;
  
//  return <hr/>
  return (
    <GoogleMap zoom={10} center={{lat: 40.71740777113275, lng:-73.99767419333442}} className='map-container'> </GoogleMap>
    );
 };

  
export default MapContainer;