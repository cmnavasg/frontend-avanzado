import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import * as StudiesActions from '../../../shared/state/user/profile-student/studies.actions';
import * as LanguagesAction from '../../../shared/state/user/profile-student/languages.actions';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../shared/state/store.interface';
import * as UserStudentSelectors from '../../../shared/state/user/profile-student/profile-student.selector';
import * as ProfileStudentActions from '../../../shared/state/user/profile-student/profile-student.actions';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent {
  user: User;

  constructor(private store: Store<AppStore>) {
    this.store.dispatch(new ProfileStudentActions.GetProfile());
    this.store.select(UserStudentSelectors.selectUser).subscribe(userSel => {
      if (userSel != null) {
        this.user = userSel;
      }
    });
  }

  deleteStudy(studyID: number) {
    const studies = this.user.studies;
    const index = studies.findIndex(study => study.uid === studyID);
    if (index === -1) {
      alert('Error: Study not found');
      return;
    }
    studies.splice(index, 1);

    this.store.dispatch(new StudiesActions.DeleteStudy(this.user));
  }

  deleteLanguage(languageID: number) {
    const languages = this.user.languages;
    const index = languages.findIndex(language => language.uid === languageID);
    if (index === -1) {
      alert('Error: Language not found');
      return;
    }
    languages.splice(index, 1);

    this.store.dispatch(new LanguagesAction.DeleteLanguage(this.user));
  }
}
