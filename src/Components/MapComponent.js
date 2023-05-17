import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MapComponent = ({ svgMarker, defaultIcon }) => {
  const el = useRef();
  const { auth } = useSelector(state => state);
  const [map, setMap] = useState();
  
  useEffect(()=>{
    if(map){
      const bounds = new google.maps.LatLngBounds();
      
      auth.userplaces.forEach(userplace => {
        //find marker where its id is same as userplace.id, if that marker doesn't exist, add it to map. basically find the marker that corresponds to each userplace
        const latLon = { lat: userplace.place.lat, lng: userplace.place.lon }
        const existingMarker = map.markers.find(marker => marker.id === userplace.id);
        if(!existingMarker){
          const marker = new google.maps.Marker({
            map,
            position: latLon,
            title: userplace.place.name
          });
          marker.setIcon(defaultIcon);
          marker.id = userplace.id;
        
          if (userplace.isVisited) {
            marker.setIcon(svgMarker);
          }
          //add it to markers array for map
          map.markers.push(marker);
        } else {
          // else marker exists
          
          // set icon based on isVisited status
          if(userplace.isVisited){
            existingMarker.setIcon(svgMarker);
          }
          else{
            //else existing marker isVisited false
            existingMarker.setIcon(defaultIcon);
          }
        }

        bounds.extend(latLon); // extend the boundary to include each marker
      });
      if(auth.userplaces.length > 0){
        const options = {
          minZoom: 5,
        }
        map.fitBounds(bounds, options); 
      }
      //clean up, are there any markers which don't correspond to an address?
      //track the ids of the userplaces which have been removed
      const markersToRemove = [];
      map.markers.forEach( marker => {
        //if we have  marker with no corresponding address, it needs to go
        if(!auth.userplaces.find(userplace => userplace.id === marker.id)){
          //remove it from map
          marker.setMap(null);
          //add the id (same as userplace.id to the markers to remove)
          markersToRemove.push(marker.id);
        }
      });
      //clean up the map markers
      map.markers = map.markers.filter(marker => !markersToRemove.includes(marker.id));
    }
  },[auth.userplaces, map]);


useEffect(()=> {
    if(el.current){
      const _map = new google.maps.Map(el.current, {
        center: { lat: 40.737613241735396, lng: -73.99209505436473 },
        zoom: 8,
      });
      //we need to keep track of the markers on the map
      _map.markers = [];
      //setting this will allow us to know when map is ready
      setMap(_map);
    }
  }, [el]);
  return (
    <div ref={ el } style={{ height: '400px'}}/>
  );

};
export default MapComponent;
