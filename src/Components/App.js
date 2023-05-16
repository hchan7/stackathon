import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, logout, fetchUserPlaces, fetchPlaces } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
//import Form from './Form';
//import Form2 from './Form2';
//import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../secrets';
import UserPlace from './UserPlace';
import Places from './Places';

const App = ()=> {
  const { auth, places } = useSelector(state => state);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);
  // useEffect(()=> {
  //   dispatch(fetchPlaces());
  // }, []);
  
  useEffect(()=>{
    if(auth.id){
      dispatch(fetchUserPlaces());
      dispatch(fetchPlaces());
    }
  }, [auth]);
  // useEffect(()=>{
  //   fetchData()
  // },[]);
  return (
    <div>
      <h1>Vacation Bucket List</h1>
      {/*{
        auth.id ? <Home /> : <Login />
      }*/}
     {/* {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
            </nav>
          </div>
        )
      }
      */}
      {
        auth.id ? (
        <div>
        {/*<div>
            <nav>
              <Link to='/places'>Community's Places</Link>
            </nav>
          </div>
          */}
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/places'>Community's Places</Link>
            <div>
              Welcome { auth.username }!!
              <button onClick={()=> dispatch(logout())}>Logout</button>
            </div>
          </nav>
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path='/userplaces/:id' element={ <UserPlace />} />
          <Route path='/places' element={ <Places />} />
        </Routes>
      
      </div>
      ): <Login />
        
      }
      
    </div>
  );
};

export default App;
