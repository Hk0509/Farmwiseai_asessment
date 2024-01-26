// src/store/index.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers'; // Assuming you've created a 'reducers' directory

// You can use middleware if needed (e.g., redux-thunk for async actions)
// import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(/* Add middleware here if needed */));

export default store;
