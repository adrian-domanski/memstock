import { UserType } from "../../utils/types";

type ActionTypes =
  | "REGISTER_SUCCESS"
  | "LOGIN_SUCCESS"
  | "AUTH_SUCCESS"
  | "LOGOUT_SUCCESS"
  | "REGISTER_ERROR"
  | "LOGIN_ERROR"
  | "AUTH_ERROR"
  | "UPDATE_USER"
  | "GET_VOTES"
  | "USER_NEW_VOTE";

export interface IAction {
  type: ActionTypes;
  payload?: any;
}

export interface Vote {
  mediaId: string;
  type: "LIKE" | "DISLIKE";
}

export interface IState {
  user: UserType | null;
  isAuth: boolean;
  votes: Vote[];
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
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT_SUCCESS":
    case "REGISTER_ERROR":
    case "LOGIN_ERROR":
      document.cookie = `token=""; domain=${domain}; path=/; expires=${new Date().toUTCString()}`;
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "GET_VOTES":
      return {
        ...state,
        votes: action.payload,
      };
    case "USER_NEW_VOTE":
      let updatedVotes;
      if (
        state.votes.some(
          (vote) =>
            vote.mediaId === action.payload.mediaId &&
            vote.type === action.payload.type
        )
      ) {
        console.log("x");
        updatedVotes = state.votes.filter(
          (vote) => vote.mediaId !== action.payload.mediaId
        );
      } else {
        updatedVotes = [
          ...state.votes.filter(
            (vote) => vote.mediaId !== action.payload.mediaId
          ),
          action.payload,
        ];
      }

      localStorage.setItem("votes", JSON.stringify(updatedVotes));
      return {
        ...state,
        votes: [...updatedVotes],
      };
    default:
      return state;
  }
};
