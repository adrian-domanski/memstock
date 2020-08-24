import { useQuery } from "@apollo/react-hooks";
import React, { createContext, useEffect, useReducer } from "react";
import { getUserFromTokenQuery } from "../queries/userQueries";
import { authReducer, IAction, IState } from "./reducers/authReducer";

interface IAuthContext {
  ctx: IState;
  dispatch: React.Dispatch<IAction>;
}

let initState: IState = {
  user: null,
  isAuth: false,
  votes: [],
  token: null,
};

export const AuthContext = createContext<IAuthContext>(undefined);

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
  token: string;
}> = ({ children, token }) => {
  const { data, loading } = useQuery(getUserFromTokenQuery);

  if (!loading && data?.me) {
    initState = {
      user: data.me,
      isAuth: true,
      token,
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
