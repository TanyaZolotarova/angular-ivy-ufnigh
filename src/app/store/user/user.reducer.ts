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
import { UsersActions } from 'user.actions';
import { UsersActionsUnion } from 'user.actions';
import { UserData } from "../../shared/models/user.data";

export interface UserState {
  users: UserData[];
}

export const initialState: UserState = {
  users: [
    { id: 1, assets: 'sdvsd' }
  ]
};

export interface State {
  userState: UserState;
}

export function userReducer(
    state: any = initialState,
    action: UsersActionsUnion
): State {
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

const selectUser = (state: State) => state.userState;

export const selectUserList = createSelector(
    selectUser,
    (state: UserState) => state.users
);


