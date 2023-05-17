import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createUserPlace, fetchUserPlaces } from '../store';
import { Link } from 'react-router-dom';
import PlaceCreate from './PlaceCreate';
import BucketList from './BucketList';
import MapComponent from './MapComponent';

const Home = ()=> {
  const { auth, userplaces, places } = useSelector(state => state);
  const dispatch = useDispatch();
  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };
  //const defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  const defaultIcon = '../../static/default-marker.png';
 // const [map, setMap] = useState(null);
  //const markers = useRef([]);
  console.log('places!:', places)
  const newmarkers = [];
  
  
  function clearMarkers(ms) {
    for(let m of ms) {
      m.setMap(null);
      m = null;
    }
  }

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
    newmarkers.forEach((marker, index) => {
      if (marker.getTitle() === userplace.place.name) {
        marker.setMap(null); // remove the marker from the map
        newmarkers.current.splice(index, 1); // remove the marker from the markers array
       marker = null;
      }
    });
    
    const markerIndex = newmarkers.findIndex(marker => {
      console.log('marker getTitle:', marker)
      console.log('userplace Title:', userplace.place.name)
      return marker.getTitle() === userplace.place.name
      
    });
    if (markerIndex !== -1) {
      newmarkers[markerIndex].setMap(null); // remove the marker from the map
      newmarkers.current.splice(markerIndex, 1); // remove the marker from the markers array
    }
 
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
      {/*{ map ? <PlaceCreate 
        createUserPlace={ _createUserPlace } 
        map={ map } 
        createMarker={createMarker}
      /> : null }*/}
      <PlaceCreate 
        createUserPlace={ _createUserPlace } 
      /> 
      {/*<div id="map" style={{ height: "400px" }}></div>*/}
      {/*<PlaceComponent />*/}
      <MapComponent svgMarker={svgMarker} defaultIcon={ defaultIcon }/>
      <BucketList svgMarker={svgMarker} defaultIcon={ defaultIcon }markers={newmarkers} removeMarker={removeMarker} clearMarkers={clearMarkers}/>
    </div>
  );
};

export default Home;
