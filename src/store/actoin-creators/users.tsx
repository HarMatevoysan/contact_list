import { Dispatch } from "react";
import axios from "axios";
import { usersTypes } from "../actionTypes";
import { userAction } from "../../types/users";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: usersTypes.FETCH_USERS });
      const respone = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({
        type: usersTypes.FETCH_USERS_SUCCESSFUL,
        payload: respone.data,
      });
    } catch (e) {
      dispatch({ type: usersTypes.FETCH_USERS_ERROR, payload: "error" });
    }
  };
};
