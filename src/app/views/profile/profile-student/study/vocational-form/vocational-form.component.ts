import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  VocationalStudy,
  Institution,
  Category,
  TitleStudy,
  Grade,
  CollegeStudy
} from 'src/app/shared/models/study.model';
import { MockData } from 'src/app/shared/mock-data';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../../shared/inmemory-db/format-datepicker';

@Component({
  selector: 'app-vocational-form',
  templateUrl: './vocational-form.component.html',
  styleUrls: ['../../profile-student.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class VocationalFormComponent implements OnInit, OnChanges {
  @Output() onSave: EventEmitter<VocationalStudy> = new EventEmitter();
  @Input() study: VocationalStudy = {} as VocationalStudy;
  public institutions: Institution[];
  public categories: Category[];
  public titles: TitleStudy[];
  public grades: Grade[];
  public rForm: FormGroup;

  constructor() {}
  ngOnInit() {
    this.loadSelectProperties();
  }

  ngOnChanges(changes: SimpleChanges) {
    let study = {} as VocationalStudy;
    if (this.hasChangeStudy(changes.study)) {
      study = changes.study.currentValue;
    }
    this.loadFormInstance(study);
  }
  private hasChangeStudy(study) {
    return study && study.currentValue;
  }

  public loadSelectProperties(): void {
    this.institutions = MockData.VOCATIONAL_INSTITUTION;
    this.categories = MockData.VOCATIONAL_CATEGORY;
    this.titles = MockData.VOCATIONAL_TITLE;
    this.grades = MockData.VOCATIONAL_GRADES;
  }

  public loadFormInstance(study: VocationalStudy): void {
    console.log(study);
    this.rForm = new FormGroup({
      institution: new FormControl(study.institution, [Validators.required]),
      category: new FormControl(study.category, [Validators.required]),
      grade: new FormControl(study.grade, [Validators.required]),
      title: new FormControl(study.title, [Validators.required]),
      date: new FormControl(new Date(study.date)),
      dual: new FormControl(study.dual, []),
      bilingue: new FormControl(study.bilingue, [])
    });
  }

  public submit() {
    this.rForm.controls['date'].setValue(this.formateaFecha(this.rForm.controls['date'].value));
    this.onSave.emit({ ...this.study, ...this.rForm.value });
  }

  public compareInstitution(
    institution1: Institution,
    institution2?: Institution
  ) {
    return institution1.uid === (institution2 && institution2.uid);
  }
  public compareCategory(category1: Category, category2: Category) {
    return category1.uid === (category2 && category2.uid);
  }
  public compareTitle(title1: TitleStudy, title2: TitleStudy) {
    return title1.uid === (title2 && title2.uid);
  }

  public compareGrade(grade1: Grade, grade2: Grade) {
    return grade1.uid === (grade2 && grade2.uid);
  }
  public save() {
    const study: VocationalStudy = {
      certificate: false,
      ...this.rForm.value
    };
    this.onSave.emit(study);
  }

  public formateaFecha (fecha: Date) {
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return day + '/' + month + '/' + year;
  }
}
