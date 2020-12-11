import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import config from '../store/reducer';

export default combineReducers({
    auth, 
    message,
    config
});