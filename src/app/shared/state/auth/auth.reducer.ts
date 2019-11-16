import {AuthActions, AuthActionTypes} from './auth.actions';
import {AuthState} from './auth.state';
import {createNewUser} from '../../models/user.model';

export function authInitialState() {
    return {
        isLogged: false,
        loading: false
    };
}

const defaultState: AuthState = {
    ...authInitialState()
}

export function authReducer(
    state= defaultState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                loading: true
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                loading: false
            };

        case AuthActionTypes.LOGIN_FAILED:
            return {
                ...state
            };

        case AuthActionTypes.LOGOUT_SUCCESS:
            const entity = {};
            return {
                ...state,
                isLogged: false
            };

        default:
            return state;
    }
}
