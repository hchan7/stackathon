import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchUserPlaces } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
//import Form from './Form';
//import Form2 from './Form2';
//import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../secrets';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    dispatch(loginWithToken());
    console.log('fetching user places');
    dispatch(fetchUserPlaces());
  }, []);
  
  // useEffect(()=>{
  //   fetchData()
  // },[]);
  return (
    <div>
      <h1>FS App Template</h1>
      {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
            </nav>
          </div>
        )
      }
    </div>
  );
};

export default App;
