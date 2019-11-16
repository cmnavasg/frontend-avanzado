import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import * as OffersAction from '../../../shared/state/offers/offers.actions';
import * as OffersSelectors from '../../../shared/state/offers/offers.selector';
import * as ProfileStudentActions from '../../../shared/state/user';
import * as UserStudentSelectors from '../../../shared/state/user/profile-student/profile-student.selector';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../shared/state/store.interface';

@Component({
  selector: 'app-offers-detail',
  templateUrl: './offers-detail.component.html',
  styleUrls: ['./offers-detail.component.scss']
})
export class OffersDetailComponent implements OnInit {
  offer: Offer;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>
  ) {
    this.store.dispatch(new ProfileStudentActions.GetProfile());
    this.store.dispatch(new OffersAction.GetOffers());
    this.store.select(UserStudentSelectors.selectUser).subscribe(userSel => {
      if (userSel != null) {
        this.user = userSel;
      }
    });
    this.route.params.subscribe(params => {
      this.store.select(OffersSelectors.selectOffers).subscribe(offersAll => {
        if (offersAll != null && offersAll.length > 0) {
          const offers = offersAll;
          const offerID = +params.id;
          this.offer = (offers.find(offer => offer.id === offerID) || {}) as Offer;
        }
      });
    });
  }

  subscribeOffer() {
    this.user.offers = [...this.user.offers, this.offer];
    this.store.dispatch(new ProfileStudentActions.UpdateProfile({...this.user, ...this.user.offers}));
  }
  unsubscribeOffer() {
    this.user.offers = this.user.offers.filter(
      _offer => _offer.id !== this.offer.id
    );
    this.store.dispatch(new ProfileStudentActions.UpdateProfile({...this.user, ...this.user.offers}));
  }
  isSubscribe(): boolean {
    return !!this.user.offers.find(_offer => this.offer.id === _offer.id);
  }

  ngOnInit() {}
}
