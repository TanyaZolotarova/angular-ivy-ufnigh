// import * as User from './user/user.reducer';
// import { ActionReducerMap } from '@ngrx/store';
//
// export interface State {
//   user: User.UserState;
// }
//
// export const reducers: ActionReducerMap<State> = {
//   user: User.userReducer
// };

import * as User from 'user/user.reducer';
import { ActionReducerMap } from '@ngrx/store';



export interface State {
  users: User.UserState;
}

export const reducers: ActionReducerMap<State> = {
  users: User.userReducer,
};