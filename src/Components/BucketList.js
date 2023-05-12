import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

const BucketList = ({ map, createMarker }) => {
  const { auth } = useSelector(state => state); 
  console.log('map in BucketList:', map)
  
  useEffect(()=>{
    auth.userplaces.forEach(userplace => {
      const { name, lat, lon } = userplace.place;
      createMarker(lat, lon, name);
    });
  },[auth.userplaces, createMarker]);
  //prob don't need createMarker as dependency, i don't see it changing
  
  return(
    <>
    <h2>Bucket List</h2>
    <ol>
      {
        auth.userplaces.map( userplace => {
          return(
            <li key={userplace.id} >
              {userplace.place.name}
            </li>
          )
        })
      }
    </ol>
    </>
    );
};

export default BucketList;