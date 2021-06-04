import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {ApiService} from '../../shared/services/api.service';
import {
    UsersActions,
    LoadListUsers,
    UsersListLoadedError,
    UsersListLoadedSuccess
} from "../actions/user.actions";


@Injectable()

export class UsersEffect {
    protected loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType<LoadListUsers>(UsersActions.LoadListUsers),
        exhaustMap((action) =>
            this.appService.getNamesAssets(action.payload).pipe(
                tap((value: any) => {
                    console.log('server response: ', value)
                    return value
                } ),
                map((resp) =>
                    new UsersListLoadedSuccess(resp)
                ),
                catchError(() =>
                    of(new UsersListLoadedError()),
                ),
            )
        ),
    ));

    public constructor(
        protected actions$: Actions,
        protected appService: ApiService,
    ) {
    }
}
