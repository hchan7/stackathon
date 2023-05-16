import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { updateUserPlace } from '../store';

const Places = () => {
  const { auth, userplaces, places } = useSelector(state => state);
  
  console.log('PLACES:', places)
  console.log('USERPLACES:', userplaces)
  
  // Sort places in descending order based on count
  const sortedPlaces = places.sort((a, b) => {
    const countA = userplaces.filter(up => up.placeId === a.id).length;
    const countB = userplaces.filter(up => up.placeId === b.id).length;
    return countB - countA;
  });
  return (
    <div>
      <h2>Top Destinations Based on Community's Bucket Lists</h2>
      <ol>
        {/*{
          places.map(place => {
            return (
              <li>
                {place.name}
              </li>
            )
          })
        }*/}
        {sortedPlaces.map(place => {
          const count = userplaces.filter(up => up.placeId === place.id).length;
          return (
            <li key={place.id}>
              {place.name} - Count: {count}
            </li>
          );
        })}
      </ol>
    </div>
    );
}
export default Places;