import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AppStore} from '../../shared/state/store.interface';
import {Store} from '@ngrx/store';
import * as AuthActions from '../../shared/state/auth/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppStore>
  ) {}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.Login({...this.loginForm.value}));
    this.submitted = true;
  }
}
