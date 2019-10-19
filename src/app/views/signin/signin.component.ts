import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ProfileService} from '../../shared/services/profile.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {AppSettings} from '../../shared/app.settings';
import {SigninService} from './signin.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  usuario: User;
  usuarioNoEncontrado: string;
  users: User[];
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private signinService: SigninService, private router: Router) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.usuarioNoEncontrado = '';
  }

  logIn(email: string, password: string, event: Event) {
    event.preventDefault();
    this.signinService.getUsers().subscribe (

      res => {
        if (res != null && res.length > 0) {
          this.users = res as User[];
          this.usuario = this.users.find(
            (user: User) => user.email === email && user.password === password
          );
          if (this.usuario) {
            this.signinService.setUserLoggedIn(this.usuario);
            this.navigate('/dashboard');
          } else {
            this.usuarioNoEncontrado = 'No se encuentra ningún usuario con ese email y/o contraseña';
          }
        } else {
          this.usuarioNoEncontrado = 'Hay un problema en nuestros sistemas, inténtelo más tarde';
        }
      },
      error => {
        this.usuarioNoEncontrado = 'Hay un problema en nuestros sistemas, inténtelo más tarde';
      }
    );
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
