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
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';
import { User } from 'src/app/shared/models/user.model';
import {Router} from '@angular/router';
import {Experience} from '../../../../shared/models/experience.model';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../shared/inmemory-db/format-datepicker';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ProfileExperienceComponent implements OnInit, OnChanges {
  @Input() experience: Experience = {} as Experience;
  @Input() user: User = {} as User;
  @Output() save: EventEmitter<User> = new EventEmitter();
  @Output() update: EventEmitter<User> = new EventEmitter();

  rForm: FormGroup;

  constructor(private router: Router) {}
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) {
    let experience = {} as Experience;
    if (this.hasChangeExperience(changes.experience)) {
      experience = changes.experience.currentValue;
    }
    this.loadFormInstance(experience);
  }
  private hasChangeExperience(experience) {
    return experience && experience.currentValue;
  }

  public loadFormInstance(experience: Experience): void {
    this.rForm = new FormGroup({
      empresa: new FormControl(experience.empresa, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]),
      date_inicio: new FormControl(new Date(experience.date_inicio), [
        Validators.required,
        dateValidator()
      ]),
      date_fin: new FormControl(new Date(experience.date_fin), [
        Validators.required
      ]),
      puesto: new FormControl(experience.puesto, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]),
      tareas: new FormControl(experience.tareas)
    });
  }
  public submit() {
    this.rForm.controls['date_inicio'].setValue(this.formateaFecha(this.rForm.controls['date_inicio'].value));
    this.rForm.controls['date_fin'].setValue(this.formateaFecha(this.rForm.controls['date_fin'].value));
    this.saveOrUpdate({ ...this.experience, ...this.rForm.value });
  }
  private _update(experience: Experience) {
    const experiencies = this.user.experiencies.map(_experience =>
      _experience.uid === experience.uid ? experience : _experience
    );
    const user = {
      ...this.user,
      experiencies
    };
    this.update.emit(user);
    this.router.navigate(['/admin/profile']);
  }
  private _save(experience: Experience) {
    const _experience = MockData.fakeIncreaseID<Experience>(
      this.user.experiencies,
      experience
    );
    const experiencies = [...this.user.experiencies, _experience];
    const user = {
      ...this.user,
      experiencies
    };
    this.save.emit(user);
    this.router.navigate(['/admin/profile']);
  }

  saveOrUpdate(experience: Experience) {
    this.isNew() ? this._save(experience) : this._update(experience);
  }
  public isNew(): boolean {
    return !!!this.experience;
  }

  public formateaFecha (fecha: Date) {
    const day = fecha.getDate();
    const month = fecha.getMonth();
    const year = fecha.getFullYear();
    return day + '/' + month + '/' + year;
  }

}
