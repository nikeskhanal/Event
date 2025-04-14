import { createContext, useReducer } from "react";


export const UserContext = createContext();

const getUserFromStorage = () => {
  const userData = localStorage.getItem("user");
  return userData
    ? JSON.parse(userData)
    : { token: null, isAdmin: false, role: null }; 
};

const initialState = getUserFromStorage();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, ...action.payload }; 
    case "LOGOUT":
      localStorage.removeItem("user");
      return { token: null, isAdmin: false, role: null }; // Reset role on logout
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
