import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createUserPlace, fetchUserPlaces } from '../store';
;
import PlaceCreate from './PlaceCreate';
import BucketList from './BucketList';

const Home = ()=> {
  const { auth, userplaces } = useSelector(state => state);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const markers = useRef([]);
  
  function clearMarkers(ms) {
    for(let m of ms) {
      m.setMap(null);
      m = null;
    }
  }
  const createMarker = (lat, lon, placeName) =>{
    //console.log('map:', map)
    console.log(`lat: ${lat} long: ${lon}`,)
    const latLon = new google.maps.LatLng(lat,lon);
    const marker = new google.maps.Marker({
      position: latLon,
      title: placeName
    });
    marker.setMap(map);
   // markers.current.push(marker);
    //return latLon; //
    console.log('marker from createMarker:', marker)
    return [marker, latLon];
  }
  
  useEffect(()=>{
    function initMap() {
      const newMap = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.737613241735396, lng: -73.99209505436473 },
        zoom: 8,
      });
      setMap(newMap);
    }
    initMap();
    console.log('auth.userplaces....:', auth.userplaces)
  },[]);
  
  
  
  useEffect(()=>{
    const bounds = new google.maps.LatLngBounds(); //create a boundary object
   // const newMarkers = [];
    
    
    markers.current = [];
    
    auth.userplaces.forEach(userplace => {
      const { name, lat, lon } = userplace.place;
      const [marker, latLon] = createMarker(lat, lon, name);
      markers.current.push(marker);
      
      if (userplace.isVisited) {
        marker.setIcon({
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        });
      }

      bounds.extend(latLon); // extend the boundary to include each marker
      //clearMarkers(markers.current); 
    //  newMarkers.push(marker);
    //  console.log('newmarkers:', newMarkers)
    });
    console.log('markers current after pushing marker:', markers.current)
    if(map){
      map.fitBounds(bounds); // set the map's viewport to the boundary that encompasses all the markers
      //setMarkers(newMarkers);
      console.log('this is 2nd useeffect map:', map);
    }
    console.log('this is 2nd useeffect');
  },[auth.userplaces, map, markers.current]);
  
  useEffect(()=>{
    console.log('markers.current:', markers.current)
  },[markers.current]);
  
  //define _createPlace function
  const _createUserPlace = (data) => {
    console.log(data)
    dispatch(createUserPlace(data));
  };
  
  const removeMarker = (userplace) => {
    console.log('markers length: ',markers.current.length)
    console.log('userplace in removeMarker', userplace)
    //clearMarkers(markers.current);
    
    // markers.current.forEach((marker, index) => {
    //   if (marker.getTitle() === userplace.place.name) {
    //     marker.setMap(null); // remove the marker from the map
    //     markers.current.splice(index, 1); // remove the marker from the markers array
    //   //marker = null;
    //   }
    // });
    // console.log('markers current after removing marker from map n markers:', markers.current)
  
    // const markerIndex = markers.current.findIndex(marker => {
    //   console.log('marker getTitle:', marker)
    //   console.log('userplace Title:', userplace.place.name)
    //   return marker.getTitle() === userplace.place.name
      
    // });
    // if (markerIndex !== -1) {
    //   markers.current[markerIndex].setMap(null); // remove the marker from the map
    //   markers.current.splice(markerIndex, 1); // remove the marker from the markers array
    // }
    
    const markerIndex = markers.current.findIndex(marker => {
      const { lat, lng } = marker.getPosition();
      return lat() === userplace.place.lat && lng() === userplace.place.lon;
    });

    if (markerIndex !== -1) {
      markers.current[markerIndex].setMap(null);
      markers.current.splice(markerIndex, 1);
    }
    google.maps.event.trigger(map, 'resize')
  };
  
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
        <h2>Places ({ auth.userplaces.length }), UserPlaces ({ userplaces.length })</h2>
        
      </div>
      { map ? <PlaceCreate 
        createUserPlace={ _createUserPlace } 
        map={ map } 
        createMarker={createMarker}
      /> : null }
      <div id="map" style={{ height: "400px" }}></div>
      {/*<PlaceComponent />*/}
      <BucketList map={ map } markers={markers} removeMarker={removeMarker}/>
    </div>
  );
};

export default Home;
