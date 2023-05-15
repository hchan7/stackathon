import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUserPlace, fetchUserPlaces, destroyUserPlace } from '../store';

const BucketList = ({ map, markers, removeMarker/*, createMarker*/ }) => {
  const { auth } = useSelector(state => state); 
  const dispatch = useDispatch();


  const update = async(id, isVisited) => {
    await dispatch(updateUserPlace({ id, isVisited: !isVisited }));

  };
  
  const destroy =  async(userplace) => {
    //filter out the marker corresponding to the userplace being destroyed
     removeMarker(userplace);
    await dispatch(destroyUserPlace(userplace));
    let markerToRemove = markers.current.find(marker => {
      const { lat, lng } = marker.getPosition();
      
      console.log('LAT: ',lat())
      console.log('userplace.place.LAT: ', userplace.place.lat)
      //return lat === userplace.place.lat && lng === userplace.place.lon;
      if(lat() === userplace.place.lat && lng() === userplace.place.lon){
        console.log('this is the marker to remove:', marker)
        return marker;
      }
    });
    
    // if(markerToRemove) {
    //   }
      
  };
  return(
    <>
    <h2>Bucket List</h2>
    <ol>
      {
        auth.userplaces.map( (userplace, index) => {
          return(
            <li key={userplace.id} >
              {userplace.isVisited ? userplace.place.name + ' ✔' : userplace.place.name  }  
              
              <button onClick={ () => update(userplace.id, userplace.isVisited) }>{userplace.isVisited ? 'Unmark as visited': 'Mark as visited'}</button>
              <button onClick={ ev => destroy(userplace) }>X</button>
            </li>
          )
        })
      }
    </ol>
    </>
    );
};

export default BucketList;