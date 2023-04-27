import { usersTypes } from "./../store/actionTypes";

interface ICompany {
  name: string;
}

export interface defaultState {
  name: string;
  id: number;
  email: string;
  phone: string;
  company: ICompany;
  img: string;
}

export interface userState {
  users: any[];
  user: any[];
  loading: boolean;
  error: null | string;
}

interface fetchUsers {
  type: usersTypes.FETCH_USERS;
}

interface fetchUsersSuccessful {
  type: usersTypes.FETCH_USERS_SUCCESSFUL;
  payload: [];
}

interface fetchUsersError {
  type: usersTypes.FETCH_USERS_ERROR;
  payload: string;
}

interface addUser {
  type: usersTypes.ADD_USER;
  payload: [
    name: string,
    phone: string,
    email: string,
    company: string,
    img: string
  ];
}

interface removeUser {
  type: usersTypes.REMOVE_USER;
  payload: string;
}

interface queryUser {
  type: usersTypes.QUERY_USER;
  payload: string;
}

interface editUser {
  type: usersTypes.UPDATE_USER;
  payload: [
    id: number,
    name: string,
    phone: string,
    email: string,
    company: string,
    img: string
  ];
}

export type userAction =
  | fetchUsers
  | fetchUsersSuccessful
  | fetchUsersError
  | addUser
  | removeUser
  | editUser
  | queryUser;
