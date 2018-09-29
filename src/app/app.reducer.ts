import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './auth/auth.reducer';
import * as uiReducer from './shared/ui.reducer';
// import * as entryEgressReducer from './entry-egress/entry-egress.reducer'

export interface AppState {
    ui: uiReducer.State;
    auth: authReducer.AuthState,
    // entryEgress: entryEgressReducer.EntryEgressState
}

export const combineReducer: ActionReducerMap<AppState> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer,
    // entryEgress: entryEgressReducer.entryEgressReducer
}