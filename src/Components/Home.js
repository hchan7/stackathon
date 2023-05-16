import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createUserPlace, fetchUserPlaces } from '../store';
import { Link } from 'react-router-dom';
import PlaceCreate from './PlaceCreate';
import BucketList from './BucketList';

const Home = ()=> {
  const { auth, userplaces, places } = useSelector(state => state);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  //const markers = useRef([]);
  console.log('places!:', places)
  const newmarkers = [];
  
  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };
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
    marker.id = Math.random();
    console.log('PLACENAME', placeName, marker.id)
    marker.setMap(map);
   // markers.current.push(marker);
    newmarkers.push(marker);
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
   const bounds = new google.maps.LatLngBounds(); //create a boundary object
   //clearMarkers(markers.current); 
  //   markers.current = [];
  
  
  
   useEffect(()=>{
     auth.userplaces.forEach(userplace => {
      //
      const { name, lat, lon } = userplace.place;
      const [marker, latLon] = createMarker(lat, lon, name);
      //markers.current.push(marker);
      
      if (userplace.isVisited) {
        //clearMarkers(newmarkers); 
        marker.setIcon(svgMarker);
      }

      bounds.extend(latLon); // extend the boundary to include each marker
      //clearMarkers(markers.current); 
    //  newMarkers.push(marker);
    //  console.log('newmarkers:', newMarkers)
    });
    //console.log('markers current after pushing marker:', markers.current)
    console.log('newmarkers current after pushing marker:', newmarkers)
    if(map){
      map.fitBounds(bounds); 
    }
  //   const bounds = new google.maps.LatLngBounds(); //create a boundary object
  // // const newMarkers = [];
  //   clearMarkers(markers.current); 
  //   markers.current = [];
    
  //   console.log('num of auth.userplaces:', auth.userplaces.length)
  //   auth.userplaces.forEach(userplace => {
  //     //
  //     const { name, lat, lon } = userplace.place;
  //     const [marker, latLon] = createMarker(lat, lon, name);
  //     markers.current.push(marker);
      
  //     if (userplace.isVisited) {
  //       marker.setIcon({
  //         url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  //       });
  //     }

  //     bounds.extend(latLon); // extend the boundary to include each marker
  //     //clearMarkers(markers.current); 
  //   //  newMarkers.push(marker);
  //   //  console.log('newmarkers:', newMarkers)
  //   });
  //   console.log('markers current after pushing marker:', markers.current)
  //   if(map){
  //     map.fitBounds(bounds); // set the map's viewport to the boundary that encompasses all the markers
  //     //setMarkers(newMarkers);
  //     console.log('this is 2nd useeffect map:', map);
  //   }
  //   console.log('this is 2nd useeffect');
   },[auth.userplaces]);//auth.userplaces, map, markers.current
  
  // useEffect(()=>{
  //   console.log('markers.current:', markers.current)
  // },[markers.current]);
  
  //define _createPlace function
  const _createUserPlace = (data) => {
    console.log(data)
    dispatch(createUserPlace(data));
  };
  
  const removeMarker = (userplace) => {
    //console.log('markers length: ',markers.current.length)
    console.log('markers length: ',newmarkers.length)
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
    
    // const markerIndex = markers.current.findIndex(marker => {
    //   const { lat, lng } = marker.getPosition();
    //   return lat() === userplace.place.lat && lng() === userplace.place.lon;
    // });

    // if (markerIndex !== -1) {
    //   markers.current[markerIndex].setMap(null);
    //   markers.current.splice(markerIndex, 1);
    // }
    // google.maps.event.trigger(map, 'resize')
  };
  
  return (
    <div>
      
      <div>
        {/*<nav>
        <Link to='/places'>Community's Places</Link>
        <div>
        Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
        </div>
        </nav>
        */}
        <h2>Total Places in Community's Bucket Lists: { places.length }</h2>
        
      </div>
      { map ? <PlaceCreate 
        createUserPlace={ _createUserPlace } 
        map={ map } 
        createMarker={createMarker}
      /> : null }
      <div id="map" style={{ height: "400px" }}></div>
      {/*<PlaceComponent />*/}
      <BucketList map={ map } markers={newmarkers} removeMarker={removeMarker}/>
    </div>
  );
};

export default Home;
