import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {Offer} from '../models/offer.model';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) { }

  getOfertas(): Observable<Offer[]> {
    return this.http.get<Offer[]>(AppSettings.API_ENDPOINT_OFFERS);
  }

  getOferta(uid) {
    const params = new HttpParams()
      .set('id', uid);
    return this.http.get<Offer[]>(AppSettings.API_ENDPOINT_OFFERS, {params}).toPromise();
  }
}
