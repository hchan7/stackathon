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
  return state;
};

//this fetches just the userplaces associated with the logged in user
export const fetchUserPlaces = () => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token'); //
    const response = await axios.get('/api/userplaces', {
      headers: {
        authorization: token,
      }
    });
    console.log('get userplace response.data:', response.data);
    //dispatch({ type: 'SET_USERPLACES', userplaces: response.data });
    dispatch(loginWithToken());
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

export default userplaces;