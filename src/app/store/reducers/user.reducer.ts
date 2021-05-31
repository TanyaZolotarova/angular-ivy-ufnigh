// import { createSelector } from '@ngrx/store';
// import { UserActions } from './user.actions';
// import { UserActionsUnion } from './user.actions';
//
// export interface UserState {
//   users: string[];
// }
//
// const initialState: UserState = {
//   users: []
// };
//
// export interface State {
//   userState: UserState;
// }
//
// export function userReducer(
//   state: any = initialState,
//   action: UserActionsUnion
// ) {
//   switch (action.type) {
//     case UserActions.UsersLoadedSuccess:
//       return {
//         ...state,
//         users: action.payload
//       };
//     case UserActions.UsersLoadedError:
//       return {
//         ...state,
//         users: []
//       };
//     default:
//       return state;
//   }
// }
//
// const selectUser = (state: State) => state.userState;
//
// export const selectUserList = createSelector(
//   selectUser,
//   (state: UserState) => state.users
// );


import { createSelector } from '@ngrx/store';
import { UsersActions } from '../actions/user.actions';
import { UsersActionsUnion } from '../actions/user.actions';
import { IUserData } from "../../shared/models/user.data";
import {State} from "../index";

export interface UserState {
  users: IUserData[];
}

export const initialState: UserState = {
  users: null
};

export function userReducer(
    state: UserState = initialState,
    action: UsersActionsUnion
): UserState {
  switch (action.type) {
    case UsersActions.LoadListUsers:
      return state;
    case UsersActions.UsersListLoadedSuccess:
      return {
        ...state,
        users: action.payload
      };
    case UsersActions.UsersListLoadedError:
      return state;
    default:
      return state;
  }
}



