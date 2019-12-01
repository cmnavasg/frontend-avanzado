import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileStudyComponent } from './profile-student/study/profile-study.component';
import { VocationalFormComponent } from './profile-student/study/vocational-form/vocational-form.component';
import { UniversityDegreeComponent } from './profile-student/study/university-degree-form/university-degree-form.component';
import { ProfileLanguageComponent } from './profile-student/language/profile-language.component';
import { ProfileAccountComponent } from './profile-student/account/profile-account.component';
import { ProfileAccountWrapperComponent } from './profile-student/account/profile-account.component-wrapper';
import { ProfileLanguageWrapperComponent } from './profile-student/language/profile-language.component-wrapper';
import { ProfileStudyWrapperComponent } from './profile-student/study/profile-study.component-wrapper';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import {StatModule} from '../../shared/modules/stat/stat.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {ProfileExperienceComponent} from './profile-student/work-experience/profile-experience.component';
import {ProfileExperienceWrapperComponent} from './profile-student/work-experience/profile-experience.component-wrapper';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileStudentComponent,
    ProfileStudyComponent,
    ProfileStudyWrapperComponent,
    VocationalFormComponent,
    UniversityDegreeComponent,
    ProfileLanguageComponent,
    ProfileLanguageWrapperComponent,
    ProfileAccountComponent,
    ProfileAccountWrapperComponent,
    ProfileExperienceComponent,
    ProfileExperienceWrapperComponent
  ],
  imports: [SharedModule, CommonModule, ProfileRoutingModule, MatTableModule, StatModule, MatIconModule, MatCardModule, MatButtonModule,
    MatInputModule, MatCheckboxModule, FlexLayoutModule.withConfig({addFlexToParent: false}), MatDatepickerModule,
    MatNativeDateModule, MatSelectModule]
})
export class ProfileModule {}
