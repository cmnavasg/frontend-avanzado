import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MockData } from 'src/app/shared/mock-data';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';
import {
  User,
  DocumentType,
  Municipe,
  Province
} from 'src/app/shared/models/user.model';
import { documentNumberValidator } from 'src/app/shared/directives/document-number-validator.directive';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../../shared/inmemory-db/format-datepicker';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ProfileAccountComponent implements OnInit, OnChanges {
  @Input() user: User;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSave: EventEmitter<User> = new EventEmitter<User>();
  rForm: FormGroup;
  documentsType: DocumentType[];
  municipes: Municipe[];
  provinces: Province[];

  constructor(private router: Router) {}
  ngOnInit() {
    this.loadSelectProperties();
    this.loadFormInstance();
  }
  ngOnChanges() {
    this.loadFormInstance();
  }
  public loadSelectProperties(): void {
    this.documentsType = MockData.DOCUMENTS_TYPE;
    this.municipes = MockData.MUNICIPES;
    this.provinces = MockData.PROVINCES;
  }

  public loadFormInstance(): void {
    this.rForm = new FormGroup(
      {
        name: new FormControl(this.user.name, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
          Validators.pattern(/^[a-zA-Z]+$/)
        ]),
        surname: new FormControl(this.user.surname, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
          Validators.pattern(/^[a-zA-Z]+$/)
        ]),
        phone: new FormControl(this.user.phone, [
          Validators.pattern(/^[0-9]{6,}$/),
          Validators.required
        ]),
        phone2: new FormControl(this.user.phone2, [
          Validators.pattern(/^[0-9]{6,}$/),
          Validators.required
        ]),

        birthdate: new FormControl(new Date(this.user.birthdate), [
          Validators.required,
          dateValidator()
        ]),
        documentType: new FormControl(this.user.documentType, [
          Validators.required
        ]),
        documentNumber: new FormControl(this.user.documentNumber, [
          Validators.required
        ]),
        street: new FormControl(this.user.address.street, [
          Validators.required
        ]),
        municipe: new FormControl(this.user.address.municipe, [
          Validators.required
        ]),
        province: new FormControl(this.user.address.province, [
          Validators.required
        ]),
        aboutMe: new FormControl(this.user.aboutMe),
        otherCompetences: new FormControl(this.user.aboutMe),
        license: new FormControl(this.user.license)
      },
      documentNumberValidator()
    );
  }

  public save() {
    if (this.rForm.controls['birthdate'].value) {
      this.rForm.controls['birthdate'].setValue(this.formateaFecha(this.rForm.controls['birthdate'].value));
    }
    const { street = '', municipe = '', province = '', ...rest } = {
      ...this.rForm.value
    };
    const address = {
      street,
      municipe,
      province
    };
    const user = { ...this.user, address, ...rest };
    this.onSave.emit(user);
    this.router.navigate(['/admin/profile']);
  }
  compareByUID(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }

  public formateaFecha (fecha: Date) {
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return day + '/' + month + '/' + year;
  }
}
