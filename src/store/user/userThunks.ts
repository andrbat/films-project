import jwt_decode from "jwt-decode";
import { Dispatch } from "redux";
import { actionSetUser } from "./userActions";

export const getUserTokenThunk = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    try {
      const decoded: { email: string; isadmin: string } = jwt_decode(token);
      dispatch(actionSetUser(decoded.email, decoded.isadmin === "true"));
    } catch (error) {
      console.log("decoded JWT: ", error);
    }
  }
};
