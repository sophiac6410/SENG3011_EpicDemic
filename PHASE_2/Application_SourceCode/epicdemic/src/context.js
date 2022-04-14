import React, { createContext } from 'react';

export const initialValue = {
  loggedIn: false,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;