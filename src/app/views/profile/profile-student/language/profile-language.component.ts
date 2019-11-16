import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../../shared/services/profile.service';
import { MockData } from 'src/app/shared/mock-data';
import {
  Language,
  LanguageLevel,
  LanguageName
} from 'src/app/shared/models/language.model';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';
import * as LanguagesAction from '../../../../shared/state/user/profile-student/languages.actions';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../../shared/state/store.interface';
import * as ProfileStudentActions from '../../../../shared/state/user';
import * as UserStudentSelectors from '../../../../shared/state/user/profile-student/profile-student.selector';
import {User} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {
  rForm: FormGroup;
  language: Language = {} as Language;
  languageLevels: LanguageLevel[];
  languageNames: LanguageName[];
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
          this.language = (this.user.languages.find(language => language.uid === uid) ||
              {}) as Language;
        });
      }
    });
  }
  ngOnInit() {
    this.loadSelectProperties();
    this.loadFormInstance();
  }
  public loadSelectProperties(): void {
    this.languageLevels = MockData.LANGUAGES_LEVEL;
    this.languageNames = MockData.LANGUAGES_NAME;
  }

  public loadFormInstance(): void {
    this.rForm = new FormGroup({
      level: new FormControl(this.language.level, [Validators.required]),
      name: new FormControl(this.language.name, [Validators.required]),
      date: new FormControl(this.language.date, [
        Validators.required,
        dateValidator()
      ])
    });
  }
  public submit() {
    this.saveOrUpdate({ ...this.language, ...this.rForm.value });
  }

  compareLevel(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }
  compareName(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }
  private update(language: Language) {
    const languages = this.user.languages;
    const foundIndex = languages.findIndex(
      _language => _language.uid === language.uid
    );
    languages[foundIndex] = language;
    this.store.dispatch(new LanguagesAction.UpdateLanguage({...this.user, languages}));
  }
  private save(language: Language) {
    const _language = MockData.fakeIncreaseID<Language>(
      this.user.languages,
      language
    );
    this.user.languages = [...this.user.languages, _language];
    this.store.dispatch(new LanguagesAction.CreateLanguage(this.user));
  }

  saveOrUpdate(language: Language) {
    this.isNew() ? this.save(language) : this.update(language);
  }
  public isNew(): boolean {
    return !!!this.language.uid;
  }
}
