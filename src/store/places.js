import axios from 'axios';
import { loginWithToken } from './auth';

const places = (state = [], action) => {
  if(action.type === 'SET_PLACES'){
    return action.places;
  }
  // if(action.type === 'CREATE_USERPLACE'){
  //   console.log('create userplace action:', action);
  //   return [...state, action.userplace];
  // }
  // if(action.type === 'UPDATE_USERPLACE'){
  //   console.log('update userplace action:', action);
  //   const updatedUserPlaces = state.map( userplace => {
  //     if(userplace.id === action.userplace.id) { 
  //       return action.userplace;
  //     } else {
  //       return userplace;
  //     }
  //     });
  //   return updatedUserPlaces;
  // }
  // if(action.type === 'DESTROY_USERPLACE'){
  //   return state.filter(userplace => userplace.id != action.userplace.id);
  // }
  return state;
};

export const fetchPlaces = () => {
  return async(dispatch) => {
    //const token = window.localStorage.getItem('token'); //
    console.log('step 1')
    // const response = await axios.get('/api/userplaces/places', {
    //   headers: {
    //     authorization: token,
    //   }
    // });
    const response = await axios.get('/api/userplaces/places');
    console.log('get place response.data:', response.data);
    dispatch({ type: 'SET_PLACES', places: response.data });
    //dispatch(loginWithToken());
  };
};

export default places;