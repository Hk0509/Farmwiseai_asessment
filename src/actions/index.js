// src/actions/index.js
export const addField = (field) => ({
    type: 'ADD_FIELD',
    payload: field,
  });
  
export const resetField = () => ({
    type: 'RESET_FIELDS',
});