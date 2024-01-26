// src/reducers/index.js
import { combineReducers } from 'redux';
import fieldsReducer from './fieldsReducer'; // Assuming you have a 'fieldsReducer' file

const rootReducer = combineReducers({
  fields: fieldsReducer,
  // Add other reducers here if you have them
});

export default rootReducer;
