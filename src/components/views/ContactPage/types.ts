import { defaultState } from "../../../types/users";

export interface IContactPage {
  contact: defaultState;
  setVisible: (value: boolean) => void;
}
