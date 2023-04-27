import thunk from "redux-thunk";
import contactsReducer from "./reducer";
import { applyMiddleware, createStore } from "redux";

export const store = createStore(contactsReducer, applyMiddleware(thunk));
