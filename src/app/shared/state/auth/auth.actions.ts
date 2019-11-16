// Enumeraciones de acciones que puede realizar la autenticación
import {Action} from '@ngrx/store';
import {Credentials, User} from '../../models/user.model';
import {AuthState} from './auth.state';

export enum AuthActionTypes {
    // Desencadenante de la acción
    LOGIN = '[Auth] Login',
    // Respuestas de éxito o error
    LOGIN_SUCCESS = '[Auth] Login success',
    LOGIN_FAILED = '[Auth] Login failed',
    // Desencadenante de la acción
    LOGOUT = '[Auth] Logout',
    // Respuestas de éxito o error
    LOGOUT_SUCCESS = '[Auth] Logout success',
    LOGOUT_FAILED = '[Auth] Logout failed'
}

// Acciones

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public credentials: Credentials) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;

    constructor(public payload: AuthState) {}
}
export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILED;

    constructor(public message: string) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;

    constructor() {}
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionTypes.LOGOUT_SUCCESS;

    constructor(public auth: User) {}
}
export class LogoutFailed implements Action {
    readonly type = AuthActionTypes.LOGOUT_FAILED;

    constructor(public message: string) {}
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFailed
    | Logout
    | LogoutSuccess
    | LogoutFailed;
