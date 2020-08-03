import React, { createContext, useReducer } from "react";
import { authReducer, IAction, IState } from "./reducers/authReducer";
import { useQuery } from "@apollo/react-hooks";
import { getUserFromTokenQuery } from "../queries/userQueries";

let initState: IState = {
  user: null,
  isAuth: false,
  token: null,
};

interface IAuthContext {
  ctx: typeof initState;
  dispatch: React.Dispatch<IAction>;
}

export const AuthContext = createContext<IAuthContext>(undefined);

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
  token: string;
}> = ({ children, token }) => {
  const { data, loading } = useQuery(getUserFromTokenQuery);
  if (!loading && data && data.me) {
    initState = {
      user: data.me,
      isAuth: true,
      token,
    };
  }
  const [ctx, dispatch] = useReducer(authReducer, initState);
  return (
    <AuthContext.Provider value={{ ctx, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
