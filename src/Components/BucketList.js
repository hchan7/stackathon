import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { updateUserPlace, fetchUserPlaces, destroyUserPlace } from '../store';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const BucketList = ({ map, markers, removeMarker/*, createMarker*/ }) => {
  const { auth } = useSelector(state => state); 
  const dispatch = useDispatch();


  const update = async(id, isVisited) => {
    await dispatch(updateUserPlace({ id, isVisited: !isVisited }));

  };
  
  const destroy =  async(userplace) => {
    //filter out the marker corresponding to the userplace being destroyed
     removeMarker(userplace);
     console.log('userplace to destroy: ', userplace)
    await dispatch(destroyUserPlace(userplace));
    let markerToRemove = markers.find(marker => {
      const { lat, lng } = marker.getPosition();
      
      console.log('LAT: ',lat())
      console.log('userplace.place.LAT: ', userplace.place.lat)
      //return lat === userplace.place.lat && lng === userplace.place.lon;
      if(lat() === userplace.place.lat && lng() === userplace.place.lon){
        console.log('this is the marker to remove:', marker)
        return marker;
      }
    });
    console.log('marker to remove', markerToRemove, markerToRemove.id)
    markerToRemove.setMap(null);
    // if(markerToRemove) {
    //   }
      
  };
  return(
    <div className='bucketlist'>
    <h2>My Bucket List ({auth.userplaces.length})</h2>
    <ol>
      {
        auth.userplaces.map( (userplace, index) => {
          return(
            <li key={userplace.id} >
              {userplace.isVisited ? userplace.place.name + ' ✔' : userplace.place.name}  
              {/*{userplace.isVisited ? userplace.place.name + ' ✔' : <Link to={`/userplaces/${userplace.id}`}>{userplace.place.name}</Link>}*/}
              <button onClick={ () => update(userplace.id, userplace.isVisited) }>{userplace.isVisited ? 'Unmark as visited': 'Mark as visited'}</button>
              <Tooltip title="Delete">
                <IconButton onClick={ ev => destroy(userplace) }><DeleteIcon /></IconButton>
              </Tooltip>
            </li>
          )
        })
      }
    </ol>
    </div>
    );
};

export default BucketList;