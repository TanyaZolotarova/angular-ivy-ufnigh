import { Action } from '@ngrx/store';

export enum SelectionActions {
    listRequest = '[Selection List] Load List Selection',
    listSuccess = '[Selection List] Selection List Loaded Success',
    listError = '[Selection List] Selection List Loaded Error',

    deleteRequest = '[Selection List] Delete Request',
    deleteSuccess = '[Selection List] Delete Success',
    deleteError= '[Selection List] Delete Error',

    updateRequest = '[Selection List] Update Request',
    updateSuccess = '[Selection List] Update Success',
    updateError= '[Selection List] Update Error',
}

export class SelectionListRequest implements Action {
    readonly type = SelectionActions.listRequest;

}

export class SelectionListSuccess implements Action {
    readonly type = SelectionActions.listSuccess;

    constructor(public payload: any) {}
}

export class SelectionListError implements Action {
    readonly type = SelectionActions.listError;
    constructor(public payload: any) {}
}

export class SelectionDeleteRequest implements Action {
    readonly type = SelectionActions.deleteRequest;

    constructor(public payload: any) {}
}

export class SelectionDeleteSuccess implements Action {
    readonly type = SelectionActions.deleteSuccess;

    constructor(public payload: any) {}
}

export class SelectionDeleteError implements Action {
    readonly type = SelectionActions.deleteError;

    constructor(public payload: any) {}
}

export class SelectionUpdateRequest implements Action {
    readonly type = SelectionActions.updateRequest;

    constructor(public payload: any) {
    }
}

export class SelectionUpdateSuccess implements Action {
    readonly type = SelectionActions.updateSuccess;

    constructor(public payload: any) {}
}

export class SelectionUpdateError implements Action {
    readonly type = SelectionActions.updateError;

    constructor(public payload: any) {}
}

export type SelectionActionsUnion =
    | SelectionListRequest
    | SelectionListSuccess
    | SelectionListError
    | SelectionDeleteRequest
    | SelectionDeleteSuccess
    | SelectionDeleteError
    | SelectionUpdateRequest
    | SelectionUpdateSuccess
    | SelectionUpdateError;
