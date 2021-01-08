import { useQuery } from "@apollo/react-hooks";
import React, { createContext, useEffect, useReducer } from "react";
import { getUserFromTokenQuery } from "../queries/userQueries";
import AuthPages from "./AuthPages";
import { authReducer, IAction, IState } from "./reducers/authReducer";

interface IAuthContext {
  ctx: IState;
  dispatch: React.Dispatch<IAction>;
}

let initState: IState = {
  user: null,
  isAuth: false,
  votes: [],
};

export const AuthContext = createContext<IAuthContext>(undefined);

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data, loading } = useQuery(getUserFromTokenQuery);

  if (!loading && data?.me) {
    initState = {
      user: data.me,
      isAuth: true,
      votes: [],
    };
  }
  const [ctx, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    if (localStorage.getItem("votes")) {
      const parsedVotes = JSON.parse(localStorage.getItem("votes"));
      dispatch({ type: "GET_VOTES", payload: parsedVotes });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ctx, dispatch }}>
      <AuthPages children={children} />
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
