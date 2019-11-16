import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/shared/app.settings';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SigninService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(AppSettings.API_ENDPOINT_USERS);
  }

  login(auth): Observable<any> {
    return this.getUsers().pipe(
        map(users => users.find((user: any) => user.email === auth.email && user.password === auth.password)));
  }
}
