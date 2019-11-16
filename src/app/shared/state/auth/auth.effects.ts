import { Actions, Effect, ofType } from '@ngrx/effects';
import {from, Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {SigninService} from '../../../views/signin/signin.service';
import {Credentials, User} from '../../models/user.model';
import * as AuthActions from './auth.actions';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private signinService: SigninService,
        private router: Router
    ) {
    }

    AUTH_ACTIONS_SUCCESS = [
        AuthActions.AuthActionTypes.LOGIN_SUCCESS,
        AuthActions.AuthActionTypes.LOGOUT_SUCCESS
    ];

    AUTH_ACTIONS_FAILED = [
        AuthActions.AuthActionTypes.LOGIN_FAILED,
        AuthActions.AuthActionTypes.LOGOUT_FAILED

    ];

    @Effect()
    login$: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.LOGIN),
        map((action: any) => action.credentials),
        exhaustMap((cred: Credentials) =>
            (this.signinService.login(cred)).pipe(
                map((user: User) => new AuthActions.LoginSuccess({isLogged: true, loading: false}),
                catchError(error => of(new AuthActions.LoginFailed(error)))
                )
            )
        )
    );

    @Effect({ dispatch: false })
    loginSuccess$: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.LOGIN_SUCCESS),
        tap(() => this.router.navigate(['admin/dashboard']))
    );

}
