import {UsersActions, UsersActionsUnion} from '../actions/user.actions';
import {IUserData} from "../../shared/models/user.data";


export interface UserState {
  allUsers: IUserData[],
  amountOfRows: number,
}

export const initialState: UserState = {
  allUsers: [],
  amountOfRows: 0,
};

export function userReducer(
    state: UserState = initialState,
    action: UsersActionsUnion
): UserState {
  switch (action.type) {
    case UsersActions.UsersListLoadedSuccess:
      return action.payload;

    default:
      return state;
  }
}



