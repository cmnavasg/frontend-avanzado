import { Actions, Effect, ofType } from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {User} from '../../../models/user.model';
import {LanguagesActionTypes} from './languages.actions';
import * as LanguagesActions from './languages.actions';

@Injectable()
export class LanguagesEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private router: Router
    ) {
    }

    @Effect()
    createLanguage$: Observable<any> = this.actions$.pipe(
        ofType(LanguagesActionTypes.CREATE_LANGUAGE),
        mergeMap((action: any) =>
            this.profileService.updateProfile(action.user).pipe(
                map(() => {
                    return new LanguagesActions.CreateLanguageSuccess(action.user);
                }),
                catchError((error) => of(new LanguagesActions.CreateLanguageFailed(error)))
            )));

    @Effect({ dispatch: false })
    createLanguageSuccess$: Observable<any> = this.actions$.pipe(
        ofType(LanguagesActionTypes.CREATE_LANGUAGE_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) =>
            this.profileService.updateUser(user)),
        exhaustMap(() => this.router.navigate(['/admin/profile']))
    );

    @Effect()
    updateLanguage$: Observable<any> = this.actions$.pipe(
        ofType(LanguagesActionTypes.UPDATE_LANGUAGE),
        mergeMap((action: any) =>
            this.profileService.updateProfile(action.user).pipe(
                map(() => {
                    return new LanguagesActions.UpdateLanguageSuccess(action.user);
                }),
                catchError((error) => of(new LanguagesActions.UpdateLanguageFailed(error)))
            )));

    @Effect({ dispatch: false })
    updateLanguageSuccess$: Observable<any> = this.actions$.pipe(
        ofType(LanguagesActionTypes.UPDATE_LANGUAGE_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) =>
            this.profileService.updateUser(user)),
        exhaustMap(() => this.router.navigate(['/admin/profile']))
    );

    @Effect()
    deleteLanguage$: Observable<any> = this.actions$.pipe(
        ofType(LanguagesActionTypes.DELETE_LANGUAGE),
        map((action: any) => action.user),
        switchMap((user: any) =>
            (this.profileService.updateProfile(user).pipe(
                map(() => new LanguagesActions.DeleteLanguageSuccess(user),
                    catchError(error => of(new LanguagesActions.DeleteLanguageFailed(error)))
                )
            )
        )
    ));

    @Effect({ dispatch: false })
    deleteLanguageSuccess$: Observable<any> = this.actions$.pipe(
        ofType(LanguagesActionTypes.DELETE_LANGUAGE_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) => this.profileService.updateUser(user))
    );

}
