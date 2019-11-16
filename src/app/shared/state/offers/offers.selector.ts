import { createSelector, createFeatureSelector } from '@ngrx/store';
import {OffersState} from './offers.state';

export const selectOffersState = createFeatureSelector<OffersState>(
    'offers'
);

export const selectOffers = createSelector(
    selectOffersState,
    state => state.offers
);
