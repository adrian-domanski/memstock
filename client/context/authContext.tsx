import { useQuery } from "@apollo/react-hooks";
import React, { createContext, useReducer } from "react";
import { getUserFromTokenQuery } from "../queries/userQueries";
import { User } from "../utils/types";
import { authReducer, IAction, IState } from "./reducers/authReducer";

interface IAuthContext {
  ctx: { user: User; isAuth: boolean; token: string };
  dispatch: React.Dispatch<IAction>;
}

let initState: IState = {
  user: null,
  isAuth: false,
  token: null,
};

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
