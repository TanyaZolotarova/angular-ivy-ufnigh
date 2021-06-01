import * as User from './reducers/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import {selectReducer, SelectState} from "./reducers/selection.reduser";

export interface State {
  users: User.UserState;
  select: SelectState;
}

export const reducers: ActionReducerMap<State> = {
  users: User.userReducer,
  select: selectReducer,
};