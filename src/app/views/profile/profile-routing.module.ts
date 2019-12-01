import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileAccountWrapperComponent } from './profile-student/account/profile-account.component-wrapper';
import { ProfileLanguageWrapperComponent } from './profile-student/language/profile-language.component-wrapper';
import { ProfileStudyWrapperComponent } from './profile-student/study/profile-study.component-wrapper';
import {ProfileExperienceWrapperComponent} from './profile-student/work-experience/profile-experience.component-wrapper';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'profile-student/account',
    component: ProfileAccountWrapperComponent
  },
  {
    path: 'profile-student/study',
    component: ProfileStudyWrapperComponent
  },
  {
    path: 'profile-student/study/:uid',
    component: ProfileStudyWrapperComponent
  },
  {
    path: 'profile-student/language',
    component: ProfileLanguageWrapperComponent
  },
  {
    path: 'profile-student/language/:uid',
    component: ProfileLanguageWrapperComponent
  },
  {
    path: 'profile-student/experience',
    component: ProfileExperienceWrapperComponent
  },
  {
    path: 'profile-student/experience/:uid',
    component: ProfileExperienceWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
