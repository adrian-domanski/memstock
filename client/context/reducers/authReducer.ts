type ActionTypes =
  | "REGISTER_SUCCESS"
  | "LOGIN_SUCCESS"
  | "AUTH_SUCCESS"
  | "LOGOUT_SUCCESS"
  | "REGISTER_ERROR"
  | "LOGIN_ERROR"
  | "AUTH_ERROR";

export interface IAction {
  type: ActionTypes;
  payload?: any;
}

export interface IState {
  user: any;
  isAuth: boolean;
  token: string;
}

export const authReducer = (state: IState, action: IAction) => {
  const domain =
    process.env.NODE_ENV === "development" ? "localhost" : "memstock.pl";

  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      const now = new Date();
      now.setFullYear(now.getFullYear() + 999);
      document.cookie = `token=${
        action.payload.token
      }; domain=${domain}; path=/; expires=${now.toUTCString()}`;
      return {
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT_SUCCESS":
    case "REGISTER_ERROR":
    case "LOGIN_ERROR":
      document.cookie = `token=""; domain=${domain}; path=/; expires=${new Date().toUTCString()}`;
      return {
        isAuth: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
