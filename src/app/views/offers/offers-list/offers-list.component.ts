import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import {Store} from '@ngrx/store';
import {AppStore} from '../../../shared/state/store.interface';
import * as ProfileStudentActions from '../../../shared/state/user';
import * as OffersAction from '../../../shared/state/offers/offers.actions';
import * as UserStudentSelectors from '../../../shared/state/user/profile-student/profile-student.selector';
import * as OffersSelectors from '../../../shared/state/offers/offers.selector';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnInit {
  offersStudy: Offer[] = [];
  offersOther: Offer[] = [];
  constructor(private store: Store<AppStore>) {
    this.selectOffers();
  }

  private selectOffers() {
    this.store.dispatch(new ProfileStudentActions.GetProfile());
    this.store.dispatch(new OffersAction.GetOffers());
    this.store.select(UserStudentSelectors.selectUser).subscribe(userSel => {
      if (userSel != null) {
        const studiesOfUser = userSel.studies;
        const offersOfUser = userSel.offers;
        this.store.select(OffersSelectors.selectOffers).subscribe(offersAll => {
          if (offersAll != null && offersAll.length > 0) {
            this.offersStudy = offersAll
                .filter(offer =>
                    studiesOfUser.some(study => study.uid === offer.category.uid)
                )
                .map(offer => {
                  const offerUser = !!offersOfUser.find(
                      _offerUser => _offerUser.id === offer.id
                  );
                  return { ...offer, subscribe: offerUser };
                });
            this.offersOther = offersAll.filter(offer =>
                studiesOfUser.every(study => study.uid !== offer.category.uid)
            );
          }
        });
      }
    });
  }

  ngOnInit() {}
}
