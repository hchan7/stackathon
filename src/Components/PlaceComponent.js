import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { useDispatch } from 'react-redux';
import { createPlace } from '../store';

const PlaceComponent = () => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    
    const handlePlaceChanged = () => { 
      const [ place ] = inputRef.current.getPlaces();
      if(place) { 
        console.log(place.formatted_address)
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
        //create this new place in db
        dispatch(createPlace({ name: place.formatted_address, lat: place.geometry.location.lat(), lon: place.geometry.location.lng() }));
      } 
    }

    
    return (
      <LoadScript googleMapsApiKey={'AIzaSyA7SidJsAXk68zf7HXCtjzj1cltDuhbYkg'} libraries={["places"]}>
        <StandaloneSearchBox
          onLoad={ref => inputRef.current = ref}
          onPlacesChanged={handlePlaceChanged}
        >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
        />
        </StandaloneSearchBox>
      </LoadScript>
    );
};

export default PlaceComponent;