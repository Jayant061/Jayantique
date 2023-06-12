import { createContext, useReducer } from "react";
import {
  getUser,
  logOut,
} from "../credentials";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    currentUser: {},
  };
  //reducer

  const userReducer = (state, action) => {
    switch (action.type) {
      case getUser:
        return {
          ...state,
          currentUser: action.payload,
        };
      case logOut:
        return {
          ...state,
          currentUser: action.payload,
        };
      
      default:
        return state;
    }
  };
  const [state, userDispatch] = useReducer(userReducer, INITIAL_STATE);
  return (
    <UserContext.Provider
      value={{
        currentUser: state.currentUser,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
