import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';

import {ApiService} from '../../shared/services/api.service';
import {
    SelectionActions, SelectionDeleteError, SelectionDeleteRequest, SelectionDeleteSuccess,
    SelectionListError,
    SelectionListRequest,
    SelectionListSuccess, SelectionUpdateError, SelectionUpdateRequest, SelectionUpdateSuccess
} from "../actions/selection.actions";
import {logger} from "codelyzer/util/logger";


@Injectable()

export class SelectEffect {

    protected load$ = createEffect(() => this.actions$.pipe(
        ofType<SelectionListRequest>(SelectionActions.listRequest),
        exhaustMap((action) =>
            this.appService.getSelections().pipe(
                map((resp) =>
                    new SelectionListSuccess(resp)
                ),
                catchError((error) =>
                    of(new SelectionListError(error)),
                ),
            )
        ),
    ));

    protected update$ = createEffect(() => this.actions$.pipe(
        ofType<SelectionUpdateRequest>(SelectionActions.updateRequest),
        exhaustMap((action) =>
            this.appService.updateSelectUser(action.payload.data).pipe(
                map((resp) =>
                    new SelectionUpdateSuccess(resp)
                ),
                catchError((error) =>
                    of(new SelectionUpdateError(error)),
                ),
            )
        ),
    ));

    protected delete$ = createEffect(() => this.actions$.pipe(
        ofType<SelectionDeleteRequest>(SelectionActions.deleteRequest),
        exhaustMap((action) =>
            this.appService.deleteSelectUser().pipe(
                map((resp) =>
                    new SelectionDeleteSuccess(resp)
                ),
                catchError((error) =>
                    of(new SelectionDeleteError(error)),
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