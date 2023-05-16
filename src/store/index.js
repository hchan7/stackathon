import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import userplaces from './userplaces';
import places from './places';

const reducer = combineReducers({
  auth,
  userplaces,
  places
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './userplaces';
export * from './places';