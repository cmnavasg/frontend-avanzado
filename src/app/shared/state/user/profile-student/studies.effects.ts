import { Actions, Effect, ofType } from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {User} from '../../../models/user.model';
import {StudiesActionTypes} from './studies.actions';
import * as StudiesActions from './studies.actions';

@Injectable()
export class StudiesEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private router: Router
    ) {
    }

    @Effect()
    createStudy$: Observable<any> = this.actions$.pipe(
        ofType(StudiesActionTypes.CREATE_STUDY),
        mergeMap((action: any) =>
            this.profileService.updateProfile(action.user).pipe(
                map(() => {
                    return new StudiesActions.CreateStudySuccess(action.user);
                }),
                catchError((error) => of(new StudiesActions.CreateStudyFailed(error)))
            )));

    @Effect({ dispatch: false })
    createStudySuccess$: Observable<any> = this.actions$.pipe(
        ofType(StudiesActionTypes.CREATE_STUDY_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) =>
            this.profileService.updateUser(user)),
        exhaustMap(() => this.router.navigate(['/admin/profile']))
    );

    @Effect()
    updateStudy$: Observable<any> = this.actions$.pipe(
        ofType(StudiesActionTypes.UPDATE_STUDY),
        mergeMap((action: any) =>
            this.profileService.updateProfile(action.user).pipe(
                map(() => {
                    return new StudiesActions.UpdateStudySuccess(action.user);
                }),
                catchError((error) => of(new StudiesActions.UpdateStudyFailed(error)))
            )));

    @Effect({ dispatch: false })
    updateStudySuccess$: Observable<any> = this.actions$.pipe(
        ofType(StudiesActionTypes.UPDATE_STUDY_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) =>
            this.profileService.updateUser(user)),
        exhaustMap(() => this.router.navigate(['/admin/profile']))
    );

    @Effect()
    deleteStudy$: Observable<any> = this.actions$.pipe(
        ofType(StudiesActionTypes.DELETE_STUDY),
        map((action: any) => action.user),
        switchMap((user: any) =>
            (this.profileService.updateProfile(user).pipe(
                map(() => new StudiesActions.DeleteStudySuccess(user),
                    catchError(error => of(new StudiesActions.DeleteStudyFailed(error)))
                )
            )
        )
    ));

    @Effect({ dispatch: false })
    deleteStudySuccess$: Observable<any> = this.actions$.pipe(
        ofType(StudiesActionTypes.DELETE_STUDY_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) => this.profileService.updateUser(user))
    //    exhaustMap(() => this.router.navigate(['/admin/profile']))
    );

}
