import * as entryEgressActions from './entry-egress.actions';
import { EntryEgress } from './entry-egress.model';
import { actions, SET_ITEMS } from './entry-egress.actions';

export interface EntryEgressState {
    items: EntryEgress[];
}

const initialState: EntryEgressState = {
    items: []
}

export function entryEgressReducer ( state = initialState, action: entryEgressActions.actions) {
    switch( action.type ) {
        case entryEgressActions.SET_ITEMS:
            return {
                items: [
                   ...action.items.map( item => {
                       return {
                           ...item
                       };
                   })
                ]
            };
        
        case entryEgressActions.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }
}