import { UsersTypes } from "./../store/actionTypes";

interface ICompany {
  name: string;
}

export interface IDefaultState {
  name: string;
  id: number;
  email: string;
  phone: string;
  company: ICompany;
  img: string;
}

export interface IUserState {
  users: any[];
  user: any[];
  loading: boolean;
  error: null | string;
}

interface IFetchUsers {
  type: UsersTypes.FETCH_USERS;
}

interface IFetchUsersSuccessful {
  type: UsersTypes.FETCH_USERS_SUCCESSFUL;
  payload: [];
}

interface IFetchUsersError {
  type: UsersTypes.FETCH_USERS_ERROR;
  payload: string;
}

interface IAddUser {
  type: UsersTypes.ADD_USER;
  payload: [name: string, phone: string, email: string, company: string, img: string];
}

interface IRemoveUser {
  type: UsersTypes.REMOVE_USER;
  payload: string;
}

interface IQueryUser {
  type: UsersTypes.QUERY_USER;
  payload: string;
}

interface IEditUser {
  type: UsersTypes.UPDATE_USER;
  payload: [id: number, name: string, phone: string, email: string, company: string, img: string];
}

export type userAction =
  | IFetchUsers
  | IFetchUsersSuccessful
  | IFetchUsersError
  | IAddUser
  | IRemoveUser
  | IEditUser
  | IQueryUser;
