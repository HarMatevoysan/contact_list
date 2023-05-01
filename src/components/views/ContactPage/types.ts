import { IDefaultState } from "../../../types/users";

export interface IContactPage {
  contact: IDefaultState;
  setVisible: (value: boolean) => void;
}
