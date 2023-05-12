import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createUserPlace, fetchUserPlaces } from '../store';
//import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
//import MapContainer from './MapContainer';
//import AddPlace from './AddPlace';
//import PlaceComponent from './PlaceComponent';
import PlaceCreate from './PlaceCreate';
import BucketList from './BucketList';

const Home = ()=> {
  const { auth, userplaces } = useSelector(state => state);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  //define _createPlace function
  const _createUserPlace = (data) => {
    console.log(data)
    dispatch(createUserPlace(data));
  };
  
  useEffect(()=>{
    function initMap() {
      const newMap = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.737613241735396, lng: -73.99209505436473 },
        zoom: 8,
      });
      setMap(newMap);
    }
    initMap();
  },[]);
  
  // useEffect(() => {
  //   initMap();
  // }, []);
  
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
        <h2>Places ({ auth.userplaces.length }), UserPlaces ({ userplaces.length })</h2>
        
      </div>
      { map ? <PlaceCreate createUserPlace={ _createUserPlace } map={ map }/> : null }
      <div id="map" style={{ height: "400px" }}></div>
      {/*<PlaceComponent />*/}
      {/*<BucketList map={ map }/>*/}
    </div>
  );
};

export default Home;
