import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Study,
  VocationalStudy,
  CollegeStudy
} from 'src/app/shared/models/study.model';
import { MockData } from 'src/app/shared/mock-data';
import * as ProfileStudentActions from '../../../../shared/state/user';
import * as StudiesStudentActions from '../../../../shared/state/user/profile-student/studies.actions';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../shared/state/store.interface';
import * as UserStudentSelectors from '../../../../shared/state/user/profile-student/profile-student.selector';
import {User} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-profile-study',
  templateUrl: './profile-study.component.html',
  styleUrls: ['./profile-study.component.scss']
})
export class ProfileStudyComponent {
  studiesForm: FormGroup;
  options = MockData.TYPE_STUDIES;
  study: Study = {} as (VocationalStudy | CollegeStudy);
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>
  ) {
    this.store.dispatch(new ProfileStudentActions.GetProfile());
    this.store.select(UserStudentSelectors.selectUser).subscribe(userSel => {
      if (userSel != null) {
        this.user = userSel;
        this.route.params.subscribe(params => {
          const uid = +params.uid;
          this.study = (this.user.studies.find(study => study.uid === uid) || {}) as
              | VocationalStudy
              | CollegeStudy;
        });
      }
    });
    this.studiesForm = new FormGroup({
      option: new FormControl(this.study.level, [Validators.required])
    });
  }

  compareOption(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }
  private update(study: VocationalStudy | CollegeStudy) {
    const studies = this.user.studies;
    const foundIndex = studies.findIndex(_study => _study.uid === study.uid);
    studies[foundIndex] = study;
    this.store.dispatch(new StudiesStudentActions.UpdateStudy({...this.user, studies}));
  }
  private save(study: VocationalStudy | CollegeStudy) {
    const _study = MockData.fakeIncreaseID<VocationalStudy | CollegeStudy>(
      this.user.studies,
      study
    );
    this.user.studies = [...this.user.studies, _study];
    this.store.dispatch(new StudiesStudentActions.CreateStudy(this.user));
  }

  saveOrUpdate(study: VocationalStudy | CollegeStudy) {
    study.level = this.studiesForm.get('option').value;
    this.isNew() ? this.save(study) : this.update(study);
  }
  public isNew(): boolean {
    return !!!this.study.uid;
  }
  public isSelectVocational(): boolean {
    const value = this.studiesForm.get('option').value;
    return value && value.uid === MockData.TYPE_STUDIES[0].uid;
  }
  public isSelectUniversity(): boolean {
    const value = this.studiesForm.get('option').value;
    return value && value.uid === MockData.TYPE_STUDIES[1].uid;
  }
  public backProfile() {
    this.router.navigate(['/admin/profile']);
  }
}
