import { IEmployee } from "../../modules/employee/types";

export interface loginRes {
  isLoggedIn: boolean;
  message: string;
  user: IEmployee | null;
}
