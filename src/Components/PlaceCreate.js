import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPlaces } from '../store';
import BucketList from './BucketList';

const PlaceCreate = ({createUserPlace, map}) => {
  const dispatch = useDispatch();
  
  const input = useRef();
  
  const createMarker = (lat, lon, placeName) =>{
    console.log('map:', map)
    console.log(`lat: ${lat} long: ${lon}`,)
    const latLon = new google.maps.LatLng(lat,lon);
    const marker = new google.maps.Marker({
      position: latLon,
      title: placeName
    });
    marker.setMap(map);
  }
  
  useEffect(()=>{
    if(input.current){
      //console.log('set up autocomplete');
      const autocomplete = new google.maps.places.Autocomplete(input.current, {
         types: ['(regions)'], //if combined with (cities) makes the autocomplete not work
         fields: ['formatted_address', 'geometry']
      });
      autocomplete.addListener('place_changed', ()=> {
        console.log(autocomplete.getPlace());
        console.log('formatted address:',autocomplete.getPlace().formatted_address);
        console.log('lat:',autocomplete.getPlace().geometry.location.lat());
        console.log('lon:',autocomplete.getPlace().geometry.location.lng());
        createUserPlace({ name: autocomplete.getPlace().formatted_address, lat: autocomplete.getPlace().geometry.location.lat(), lon: autocomplete.getPlace().geometry.location.lng() });
        createMarker(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng(), autocomplete.getPlace().formatted_address);
        input.current.value = '';
      });
    }
  }, [input]);
  
  return (
    <div>
      <input className='placeInput' ref={ input }/>
      <BucketList map={ map } createMarker={ createMarker }/>
    </div>
    
    )
};

export default PlaceCreate;