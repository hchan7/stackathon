import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createPlace } from '../store';
//import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
//import MapContainer from './MapContainer';
//import AddPlace from './AddPlace';
//import PlaceComponent from './PlaceComponent';
import PlaceCreate from './PlaceCreate';


const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  //define _createPlace function
  const _createPlace = (data) => {
    console.log(data)
    dispatch(createPlace(data));
  };
  let map
  
  function initMap() {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  
  useEffect(() => {
    initMap();
  }, []);
  
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
        <h2>Places ({ auth.userplaces.length })</h2>
        
      </div>
      <PlaceCreate createPlace={ _createPlace }/>
      <div id="map" style={{ height: "400px" }}></div>
      {/*<PlaceComponent />*/}
    </div>
  );
};

export default Home;
