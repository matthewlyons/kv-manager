import React, { createContext, useReducer } from 'react';
import { reducer, globalState, types } from './reducers';

const StoreContext = createContext(globalState);

const StoreProvider = ({ children }) => {
  // Set up reducer with useReducer and our defined reducer, globalState from reducers.js
  const [state, dispatch] = useReducer(reducer, globalState);

  function setError(message) {
    dispatch({
      type: types.SET_ALERT,
      payload: {
        message: message,
        success: false,
        active: true
      }
    });
  }

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        setError
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
