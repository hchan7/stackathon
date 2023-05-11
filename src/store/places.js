import axios from 'axios';

const places = (state = [], action) => {
  if(action.type === 'SET_PLACES'){
    return action.places;
  }
  if(action.type === 'CREATE_PLACE'){
    return [...state, action.place];
  }
  return state;
};

//not sure if i need to fetch places. i might if i want to show all places that users added
export const fetchPlaces = () => {
  return async(dispatch) => {
    const response = await axios.get('/api/places');
    dispatch({ type: 'SET_PLACES', places: response.data });
  };
};

export const createPlace = (data) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/userplaces', {data},
    {
      headers: {
        authorization: token
      }
    });
    console.log('response.data:', response.data);
    dispatch({ type: 'CREATE_USERPLACE', userplaces: response.data});
  };
};

export default places;