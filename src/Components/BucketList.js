import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { updateUserPlace,  destroyUserPlace } from '../store';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const BucketList = ({ svgMarker, defaultIcon, markers, removeMarker, clearMarkers}) => {
  const { auth } = useSelector(state => state); 
  const dispatch = useDispatch();

  const update = async(id, isVisited) => {
    await dispatch(updateUserPlace({ id, isVisited: !isVisited }));
  }
  const destroy =  async(userplace) => {
    console.log('userplace to destroy: ', userplace)
    await dispatch(destroyUserPlace(userplace));

  };
  return(
    <div className='bucketlist'>
    <h2 className='bucketlist-heading'>My Bucket List ({auth.userplaces.length})</h2>
    <ol >
      {
        auth.userplaces.map( (userplace, index) => {
        const visitedStatus = userplace.isVisited ? 'visited' : 'not-visited';
          return(
          <React.Fragment key={userplace.id}>
            <div className='bucketlist-div'>
              <li key={userplace.id} className={`${visitedStatus} bucketlist-item` }>
                {userplace.isVisited ? userplace.place.name + ' ': userplace.place.name}  
                {userplace.isVisited && <DoneOutlineIcon />}
              </li>
              <button className={`btn ${userplace.isVisited ? 'btn-danger' : 'btn-primary'}`} onClick={ () => update(userplace.id, userplace.isVisited) }>{userplace.isVisited ? 'Unmark as visited': 'Mark as visited'}</button>
              <Tooltip title="Delete">
                <IconButton onClick={ ev => destroy(userplace) }><DeleteIcon sx={{ color: 'white' }}  /></IconButton>
              </Tooltip>
            </div>
          </React.Fragment>
          )
        })
      }
    </ol>
    </div>
    );
};

export default BucketList;