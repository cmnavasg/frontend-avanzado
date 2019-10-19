import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {createNewUser, User} from '../../shared/models/user.model';
import {AppSettings} from '../../shared/app.settings';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/find';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private isUserLoggedIn;
  public usserLogged: User;
  users: User[];

  constructor(private http: HttpClient) {
    if (this.getIsUserLoggedIn()) {
      this.usserLogged = this.getUserLoggedIn();
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(AppSettings.API_ENDPOINT_USERS);
  }

/*  login(email: string, password: string) {
    return this.http.get<User>(AppSettings.API_ENDPOINT_USERS + '?email=' + email + '&password=' + password).pipe(
      tap(_ => console.log('found user matching ' + email)));
  }
*/
  login(email, password) {
    this.getUsers().subscribe (

      res => {
        if (res != null && res.length > 0) {
          this.users = res as User[];
          return this.users.find(
            (user: User) => user.email === email && user.password === password
          );
        } else {
          return null;
        }
      },
      error => {
        return null;
      }
    );
  }

  setUserLoggedIn(user: User) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
  }

  getUserLoggedIn() {
    return this.usserLogged;
  }
  getIsUserLoggedIn() {
    if (this.isUserLoggedIn === true) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.isUserLoggedIn = false;
    this.usserLogged = createNewUser(null);
  }
}
