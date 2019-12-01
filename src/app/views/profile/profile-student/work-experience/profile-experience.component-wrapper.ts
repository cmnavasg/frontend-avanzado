import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/shared/states/store.interface';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import {getExperienceByID, getProfile} from 'src/app/shared/states/user';
import * as UserActions from 'src/app/shared/states/user/actions';
import { User } from 'src/app/shared/models/user.model';
import {Experience} from '../../../../shared/models/experience.model';

@Component({
  selector: 'app-profile-experience-wrapper',
  template: `
    <app-profile-experience
      [experience]="experience$ | async"
      [user]="user$ | async"
      (save)="onSaveExperience($event)"
      (update)="onUpdateExperience($event)"
    ></app-profile-experience>
  `
})
export class ProfileExperienceWrapperComponent {
  experience$: Observable<Experience>;
  user$: Observable<User>;

  constructor(private route: ActivatedRoute, private store$: Store<AppStore>) {
    this.user$ = this.store$.select(getProfile);
    this.experience$ = this.route.params.pipe(
      map(({ uid: uid }: { uid: string }) => Number.parseInt(uid)),
      switchMap(uid => this.store$.select(getExperienceByID(uid)))
    );
  }

  onSaveExperience(user: User) {
    this.store$.dispatch(new UserActions.UpdateUser(user));
  }
  onUpdateExperience(user: User) {
    this.store$.dispatch(new UserActions.UpdateUser(user));
  }
}
