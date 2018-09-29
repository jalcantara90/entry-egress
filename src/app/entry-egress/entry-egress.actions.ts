import { Action } from "@ngrx/store";
import { EntryEgress } from './entry-egress.model';

export const SET_ITEMS = '[ENTRY EGRESS] Set Items';
export const UNSET_ITEMS = '[ENTRY EGRESS] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;
    constructor(public items: EntryEgress[]) {}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsAction | UnsetItemsAction;