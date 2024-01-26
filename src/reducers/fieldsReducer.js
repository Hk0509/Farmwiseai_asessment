// src/reducers/fieldsReducer.js
const initialState = [];

const fieldsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FIELD':
      return [...state, action.payload];
    
    case 'RESET_FIELDS':
      return [];
    
    default:
      return state;
  }
};

export default fieldsReducer;
