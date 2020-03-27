import {combineReducers} from 'redux';
import baseApp from './baseApp';
import movieDetails from './movieDetails';
const allReducers = combineReducers({baseApp, movieDetails});

export default allReducers;
