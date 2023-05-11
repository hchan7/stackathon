import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PlaceCreate = ({createPlace}) => {
  const input = useRef();
  useEffect(()=>{
    if(input.current){
      //console.log('set up autocomplete');
      const autocomplete = new google.maps.places.Autocomplete(input.current, {
         types: ['(regions)'] //if combined with (cities) makes the autocomplete not work
      });
      autocomplete.addListener('place_changed', ()=> {
        console.log(autocomplete.getPlace());
        console.log('formatted address:',autocomplete.getPlace().formatted_address);
        console.log('lat:',autocomplete.getPlace().geometry.location.lat());
        console.log('lon:',autocomplete.getPlace().geometry.location.lng());
        createPlace({ name: autocomplete.getPlace().formatted_address, lat: autocomplete.getPlace().geometry.location.lat(), lon: autocomplete.getPlace().geometry.location.lng() });
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