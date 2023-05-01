import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import * as ActionCreator from "./../../store/actoin-creators/users";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreator, dispatch);
};
