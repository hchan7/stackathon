import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPlaces } from '../store';
import BucketList from './BucketList';
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const PlaceCreate = ({createUserPlace, map, createMarker}) => {
  const dispatch = useDispatch();
  
  const input = useRef();
  
  useEffect(()=>{
    if(input.current){
      console.log('set up autocomplete');
      const autocomplete = new google.maps.places.Autocomplete(input.current, {
        types: ['geocode'],//['(regions)'], //if combined with (cities) makes the autocomplete not work
        fields: ['formatted_address', 'geometry']
      });
      
      autocomplete.addListener('place_changed', ()=> {
        console.log(autocomplete.getPlace());
        console.log('formatted address:',autocomplete.getPlace().formatted_address);
        console.log('lat:',autocomplete.getPlace().geometry.location.lat());
        console.log('lon:',autocomplete.getPlace().geometry.location.lng());
        createUserPlace({ name: autocomplete.getPlace().formatted_address, lat: autocomplete.getPlace().geometry.location.lat(), lon: autocomplete.getPlace().geometry.location.lng() });
        //const latLon = createMarker(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng(), autocomplete.getPlace().formatted_address);
        console.log('HI')
        input.current.value = '';
      });

    }
  }, [input]);
  
  return (
    <div>
      <input className='placeInput' ref={ input }/>
    </div>
    
    )
};

export default PlaceCreate;