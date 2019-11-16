import { Actions, Effect, ofType } from '@ngrx/effects';
import {from, Observable, of} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {OffersActionTypes} from './offers.actions';
import * as OffersActions from './offers.actions';
import {OffersService} from '../../services/offers.service';
import {Offer} from '../../models/offer.model';

@Injectable()
export class OffersEffects {
    constructor(
        private actions$: Actions,
        private offerService: OffersService,
        private router: Router
    ) {
    }

    @Effect()
    getOffers: Observable<any> = this.actions$.pipe(
        ofType(OffersActionTypes.GET_OFFERS),
        switchMap(() =>
            this.offerService.getOffers().pipe(
                map((offers: Offer[]) => new OffersActions.GetOffersSuccess(offers)),
                catchError(error => of(new OffersActions.GetOffersFailed(error)))
            )
        )
    );
}
