import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import contactsReducer from "./reducer";

export const store = createStore(contactsReducer, applyMiddleware(thunk));
