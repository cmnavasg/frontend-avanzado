import { Actions, Effect, ofType } from '@ngrx/effects';
import {from, Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {ProfileStudentActionTypes} from './profile-student.actions';
import * as ProfileStudentActions from './profile-student.actions';
import {User} from '../../../models/user.model';

@Injectable()
export class ProfileStudentEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private router: Router
    ) {
    }

    @Effect()
    getProfile: Observable<any> = this.actions$.pipe(
        ofType(ProfileStudentActionTypes.GET_PROFILE),
        switchMap(() =>
            this.profileService.loadProfile().pipe(
                map((user: User) => new ProfileStudentActions.GetProfileSuccess(user)),
                catchError(error => of(new ProfileStudentActions.GetProfileFailed(error)))
            )
        )
    );

    @Effect()
    updateProfile$: Observable<any> = this.actions$.pipe(
        ofType(ProfileStudentActionTypes.UPDATE_PROFILE),
        mergeMap((action: any) =>
            this.profileService.updateProfile(action.user).pipe(
                map(() => {
                    return new ProfileStudentActions.UpdateProfileSuccess(action.user);
                }),
                catchError((error) => of(new ProfileStudentActions.UpdateProfileFailed(error)))
            )));

    @Effect({ dispatch: false })
    updateProfileSuccess$: Observable<any> = this.actions$.pipe(
        ofType(ProfileStudentActions.ProfileStudentActionTypes.UPDATE_PROFILE_SUCCESS),
        map((action: any) => action.user),
        switchMap((user: User) =>
            this.profileService.updateUser(user)),
        exhaustMap(() => this.router.navigate(['/admin/profile']))
    );

}
