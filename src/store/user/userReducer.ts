import { UserState } from "../storeTypes";
import { InitUser, SetUser, UserActions } from "./userActions";

const initialState: UserState = {
  user: { userEmail: "", isAdmin: false },
};

export default function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case InitUser:
      return { ...initialState };
    case SetUser:
      return {
        ...state,
        user: {
          userEmail: action.payload.userEmai,
          isAdmin: action.payload.isAdmin,
        },
      };

    default:
      return state;
  }
}
