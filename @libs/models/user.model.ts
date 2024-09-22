import {RolesEnum} from "../../ui/src/app/@common/roles.enum";
import {SortEnum} from "./common.model";

export interface UserModel {
  id: number;
  role: RolesEnum;
  username: string;
  email: string;
  createdAt?: string;
  password?: string;
}

export interface UserFilter {
  role?: RolesEnum[];
  username?: string;
  email?: string;
}

export interface UserSort {
  role?: SortEnum;
  id?: SortEnum;
  createdAt?: SortEnum;
}

export interface UserCreateModel {
  role: RolesEnum;
  username: string;
  email: string;
  password: string;
}
