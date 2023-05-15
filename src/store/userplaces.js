import axios from 'axios';
import { loginWithToken } from './auth';

const userplaces = (state = [], action) => {
  if(action.type === 'SET_USERPLACES'){
    return action.userplaces;
  }
  if(action.type === 'CREATE_USERPLACE'){
    console.log('create userplace action:', action);
    return [...state, action.userplace];
  }
  if(action.type === 'UPDATE_USERPLACE'){
    console.log('update userplace action:', action);
    const updatedUserPlaces = state.map( userplace => {
      if(userplace.id === action.userplace.id) { 
        return action.userplace;
      } else {
        return userplace;
      }
      });
    return updatedUserPlaces;
  }
  if(action.type === 'DESTROY_USERPLACE'){
    return state.filter(userplace => userplace.id != action.userplace.id);
  }
  return state;
};

//this fetches just the userplaces associated with the logged in user
export const fetchUserPlaces = () => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token'); //
    console.log('step 1')
    const response = await axios.get('/api/userplaces', {
      headers: {
        authorization: token,
      }
    });
    console.log('get userplace response.data:', response.data);
    dispatch({ type: 'SET_USERPLACES', userplaces: response.data });
    //dispatch(loginWithToken());
  };
};

export const createUserPlace = (data) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/userplaces', {data},
    {
      headers: {
        authorization: token
      }
    });
    console.log('response.data:', response.data);
    //dispatch({ type: 'CREATE_USERPLACE', userplace: response.data});
    dispatch(loginWithToken());
  };
};

export const updateUserPlace = (userplace) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(`/api/userplaces/${userplace.id}`, userplace,
    {
      headers: {
        authorization: token
      }
    });
    console.log('update userplace response.data:', response.data)
    //dispatch({ type: 'UPDATE_USERPLACE', userplace: response.data});
    dispatch(loginWithToken());
  };
};

export const destroyUserPlace = (userplace) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.delete(`/api/userplaces/${userplace.id}`, 
    {
      headers: {
        authorization: token
      }
    });
    console.log('delete response:', response.data);
    dispatch(loginWithToken()); 
    //dispatch({ type: 'DESTROY_USERPLACE', userplace});
  };
};
export default userplaces;