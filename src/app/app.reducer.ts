import * as uiReducer from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './auth/auth.reducer';

export interface AppState {
    ui: uiReducer.State;
    auth: authReducer.AuthState
}

export const combineReducer: ActionReducerMap<AppState> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer
}