import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
//import Form from './Form';
//import Form2 from './Form2';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../secrets';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  
  // const fetchData = () => {
  //   const response = axios.get(`https://test.endpoint/key=${process.env.OPENCAGE_API_KEY}`)
  //   console.log('response:', response.data);
  // }
  useEffect(()=> {
    dispatch(loginWithToken());
    
  }, []);
  
  // useEffect(()=>{
  //   fetchData()
  // },[]);
  return (
    <div>
      <h1>FS App Template</h1>
      {REACT_APP_GOOGLE_MAPS_API_KEY}
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
