import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer.model';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../shared/state/store.interface';
import * as UserStudentSelectors from '../../../shared/state/user/profile-student/profile-student.selector';
import * as ProfileStudentActions from '../../../shared/state/user';

@Component({
  selector: 'app-offers-profile',
  templateUrl: './offers-profile.component.html'
})
export class OffersProfileComponent implements OnInit {
  offers: Offer[] = [];
  constructor(private store: Store<AppStore>) {
    this.selectOffers();
  }

  private selectOffers() {
    this.store.dispatch(new ProfileStudentActions.GetProfile());
    this.store.select(UserStudentSelectors.selectUser).subscribe(userSel => {
      if (userSel != null) {
        this.offers = userSel.offers;
      }
    });
  }

  ngOnInit() {}
}
