import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MockData } from 'src/app/shared/mock-data';
import {
  Language,
  LanguageLevel,
  LanguageName
} from 'src/app/shared/models/language.model';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';
import { User } from 'src/app/shared/models/user.model';
import {Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../shared/inmemory-db/format-datepicker';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ProfileLanguageComponent implements OnInit, OnChanges {
  @Input() language: Language = {} as Language;
  @Input() user: User = {} as User;
  @Output() save: EventEmitter<User> = new EventEmitter();
  @Output() update: EventEmitter<User> = new EventEmitter();

  rForm: FormGroup;
  languageLevels: LanguageLevel[];
  languageNames: LanguageName[];

  constructor(private router: Router) {}
  ngOnInit() {
    this.loadSelectProperties();
  }
  ngOnChanges(changes: SimpleChanges) {
    let language = {} as Language;
    if (this.hasChangeLanguage(changes.language)) {
      language = changes.language.currentValue;
    }
    this.loadFormInstance(language);
  }
  private hasChangeLanguage(language) {
    return language && language.currentValue;
  }
  public loadSelectProperties(): void {
    this.languageLevels = MockData.LANGUAGES_LEVEL;
    this.languageNames = MockData.LANGUAGES_NAME;
  }

  public loadFormInstance(language: Language): void {
    this.rForm = new FormGroup({
      level: new FormControl(language.level, [Validators.required]),
      name: new FormControl(language.name, [Validators.required]),
      date: new FormControl(new Date(language.date), [
        Validators.required,
        dateValidator()
      ])
    });
  }
  public submit() {
    if (this.rForm.controls['date'].value) {
      this.rForm.controls['date'].setValue(this.formateaFecha(this.rForm.controls['date'].value));
    }
    this.saveOrUpdate({ ...this.language, ...this.rForm.value });
  }

  compareLevel(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }
  compareName(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }
  private _update(language: Language) {
    const languages = this.user.languages.map(_language =>
      _language.uid === language.uid ? language : _language
    );
    const user = {
      ...this.user,
      languages
    };
    this.update.emit(user);
    this.router.navigate(['/admin/profile']);
  }
  private _save(language: Language) {
    const _language = MockData.fakeIncreaseID<Language>(
      this.user.languages,
      language
    );
    const languages = [...this.user.languages, _language];
    const user = {
      ...this.user,
      languages
    };
    this.save.emit(user);
    this.router.navigate(['/admin/profile']);
  }

  saveOrUpdate(language: Language) {
    this.isNew() ? this._save(language) : this._update(language);
  }
  public isNew(): boolean {
    return !!!this.language;
  }

  public formateaFecha (fecha: Date) {
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return day + '/' + month + '/' + year;
  }
}
