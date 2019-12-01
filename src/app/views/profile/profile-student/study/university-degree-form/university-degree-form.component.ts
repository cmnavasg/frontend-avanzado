import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollegeStudy } from 'src/app/shared/models/study.model';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../../shared/inmemory-db/format-datepicker';

@Component({
  selector: 'app-university-degree-form',
  templateUrl: './university-degree-form.component.html',
  styleUrls: ['../../profile-student.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class UniversityDegreeComponent implements OnInit, OnChanges {
  @Output() onSave: EventEmitter<CollegeStudy> = new EventEmitter();
  @Input() study: CollegeStudy = {} as CollegeStudy;
  public rForm: FormGroup;

  constructor() {}
  ngOnInit() {
    this.loadSelectProperties();
  }
  ngOnChanges(changes: SimpleChanges) {
    let study = {} as CollegeStudy;
    if (this.hasChangeStudy(changes.study)) {
      study = changes.study.currentValue;
    }
    this.loadFormInstance(study);
  }
  private hasChangeStudy(study) {
    return study && study.currentValue;
  }

  public loadSelectProperties(): void {}

  public loadFormInstance(study: CollegeStudy): void {
    this.rForm = new FormGroup({
      institution: new FormControl(study.institution, [Validators.required]),
      title: new FormControl(study.title, [Validators.required]),
      date: new FormControl(new Date(study.date)),
      bilingue: new FormControl(study.bilingue, [])
    });
  }

  public submit() {
    this.rForm.controls['date'].setValue(this.formateaFecha(this.rForm.controls['date'].value));
    this.onSave.emit({ ...this.study, ...this.rForm.value });
  }

  public save() {
    const study: CollegeStudy = {
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
