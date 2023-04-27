import { userAction, userState } from "../types/users";
import { usersTypes } from "./actionTypes";

const defaultState: userState = {
  users: [],
  user: [],
  loading: false,
  error: null,
};

const contactsReducer = (
  state = defaultState,
  action: userAction
): userState => {
  switch (action.type) {
    case usersTypes.FETCH_USERS:
      return { ...state, loading: true };

    case usersTypes.FETCH_USERS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        users: action.payload,
        user: action.payload,
      };

    case usersTypes.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case usersTypes.ADD_USER:
      const newUser = {
        id: Date.now(),
        name: action.payload[0],
        company: { name: action.payload[3] },
        phone: action.payload[1],
        email: action.payload[2],
        img: action.payload[4],
      };
      return {
        ...state,
        loading: false,
        users: [...state.users, newUser],
        user: [...state.user, newUser],
      };

    case usersTypes.REMOVE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter((id) => id.id !== action.payload),
        user: state.user.filter((id) => id.id !== action.payload),
      };

    case usersTypes.QUERY_USER:
      return {
        ...state,
        loading: false,
        users: [
          ...state.user.filter((id) =>
            id.name.toLowerCase().includes(action.payload.toLowerCase())
          ),
        ],
      };

    case usersTypes.UPDATE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload[0]
            ? {
                ...action.payload,
                name: action.payload[1],
                phone: action.payload[2],
                email: action.payload[3],
                company: { name: action.payload[4] },
                img: action.payload[5],
              }
            : user
        ),
        user: state.user.map((user) =>
          user.id === action.payload[0]
            ? {
                ...action.payload,
                name: action.payload[1],
                phone: action.payload[2],
                email: action.payload[3],
                company: { name: action.payload[4] },
                img: action.payload[5],
              }
            : user
        ),
      };

    default:
      return state;
  }
};

export default contactsReducer;

export type RootState = ReturnType<typeof contactsReducer>;
