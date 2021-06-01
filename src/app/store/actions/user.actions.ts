import { Action } from '@ngrx/store';
import { IUserData } from "../../shared/models/user.data";

export enum UsersActions {
  LoadListUsers = '[User List] Load List Users',
  UsersListLoadedSuccess = '[User List] Users List Loaded Success',
  UsersListLoadedError = '[User List] Users List Loaded Error'
}

export class LoadListUsers implements Action {
  readonly type = UsersActions.LoadListUsers;
}

export class UsersListLoadedSuccess implements Action {
  readonly type = UsersActions.UsersListLoadedSuccess;

  constructor(public payload: IUserData[]) {}
}

export class UsersListLoadedError implements Action {
  readonly type = UsersActions.UsersListLoadedError;

}

export type UsersActionsUnion =
    | LoadListUsers
    | UsersListLoadedSuccess
    | UsersListLoadedError;
