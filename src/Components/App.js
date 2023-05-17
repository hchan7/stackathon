import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, logout, fetchUserPlaces, fetchPlaces } from '../store';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
//import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../../secrets';
import UserPlace from './UserPlace';
import Places from './Places';

const App = ()=> {
  const { auth, places } = useSelector(state => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const view = location.pathname;
  console.log('view:', view)
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);


  useEffect(()=>{
    if(auth.id){
      dispatch(fetchUserPlaces());
      dispatch(fetchPlaces());
    }
  }, [auth]);

  return (
    <div>
      <h1>Vacation Bucket List</h1>
      {
        auth.id ? (
        <div>
          <nav className="nav nav-underline">
            <li className='nav-item'>
              <Link to='/' className={ view === '/' ? 'selected nav-link' : ''}>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to='/places' className={ view === '/places' ? 'selected nav-link' : ''}>Community's Places</Link>
            </li>
            <li>
              <div>
                Welcome { auth.username }!!
                <button onClick={()=> dispatch(logout())}>Logout</button>
              </div>
            </li>
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
