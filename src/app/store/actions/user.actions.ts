// import { Action } from '@ngrx/store';
//
// export enum UserActions {
//   LoadUsers = '[User Page] Load Users',
//   UsersLoadedSuccess = '[User Page] Users Loaded Success',
//   UsersLoadedError = '[User Page] Users Loaded Error'
// }
//
// export class LoadUsers implements Action {
//   readonly type = UserActions.LoadUsers;
// }
//
// export class UsersLoadedSuccess implements Action {
//   readonly type = UserActions.UsersLoadedSuccess;
//
//   constructor(public payload: any) {}
// }
//
// export class UsersLoadedError implements Action {
//   readonly type = UserActions.UsersLoadedError;
//
//   constructor(public payload: any) {}
// }
//
// export type UserActionsUnion =
//   | LoadUsers
//   | UsersLoadedSuccess
//   | UsersLoadedError;

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
