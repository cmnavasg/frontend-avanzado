import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent {
  constructor() {}
  @Input() user: User;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteStudy: EventEmitter<User> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteLanguage: EventEmitter<User> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteExperience: EventEmitter<User> = new EventEmitter();
  displayedColumnsStudies = ['tipo', 'nivel', 'titulo', 'centro', 'fecha', 'certificado', 'bilingue', 'dual', 'acciones'];
  displayedColumnsLanguages = ['nivel', 'idioma', 'fecha', 'acciones'];
  displayedColumnsExperiencies = ['empresa', 'date_inicio', 'date_fin', 'puesto', 'acciones'];

  deleteStudy(studyID: number) {
    const studies = [...this.user.studies];
    const index = studies.findIndex(study => study.uid === studyID);
    if (index === -1) {
      alert('Error: Study not found');
      return;
    }
    studies.splice(index, 1);
    const user = {
      ...this.user,
      studies
    };
    this.onDeleteStudy.emit(user);
  }
  deleteLanguage(languageID: any) {
    const languages = [...this.user.languages];
    const index = languages.findIndex(language => language.uid === languageID);
    if (index === -1) {
      alert('Error: Language not found');
      return;
    }
    languages.splice(index, 1);
    const user = {
      ...this.user,
      languages
    };
    this.onDeleteLanguage.emit(user);
  }

  deleteExperience(experienceID: any) {
    const experiencies = [...this.user.experiencies];
    const index = experiencies.findIndex(experience => experience.uid === experienceID);
    if (index === -1) {
      alert('Error: Experience not found');
      return;
    }
    experiencies.splice(index, 1);
    const user = {
      ...this.user,
      experiencies
    };
    this.onDeleteExperience.emit(user);
  }
}
