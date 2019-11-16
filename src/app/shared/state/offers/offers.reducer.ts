import {OffersActions, OffersActionTypes} from './offers.actions';
import {OffersState} from './offers.state';

export function offersInitialState() {
    return {
        offers: []
    };
}

const defaultOffersState: OffersState = {
    ...offersInitialState()
};

export function offersReducer(
    state = defaultOffersState,
    action: OffersActions
): OffersState {
    switch (action.type) {
        case OffersActionTypes.GET_OFFERS_SUCCESS:
            return {
                ...state,
                offers: action.offers
            };

        case OffersActionTypes.GET_OFFERS_SUCCESS:
            return {
                ...state,
                offers: action.offers
            };

        case OffersActionTypes.GET_OFFERS_FAILED:
            return {
                ...state,
                offers: null
            };

        default:
            return state;
    }
}
