import { Action } from '@ngrx/store';
import {IPaginationRequest} from "../../shared/models/user.data";
import {UserState} from "../reducers/user.reducer";

export enum UsersActions {
  LoadListUsers = '[User List] Load List Users',
  UsersListLoadedSuccess = '[User List] Users List Loaded Success',
  UsersListLoadedError = '[User List] Users List Loaded Error'
}

export class LoadListUsers implements Action {
  readonly type = UsersActions.LoadListUsers;
  constructor(public payload: IPaginationRequest) {}
}

export class UsersListLoadedSuccess implements Action {
  readonly type = UsersActions.UsersListLoadedSuccess;

  constructor(public payload: UserState) {}
}

export class UsersListLoadedError implements Action {
  readonly type = UsersActions.UsersListLoadedError;

}

export type UsersActionsUnion =
    | LoadListUsers
    | UsersListLoadedSuccess
    | UsersListLoadedError;
