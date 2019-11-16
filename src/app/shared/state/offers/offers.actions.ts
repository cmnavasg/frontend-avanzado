// Enumeraciones de acciones que puede realizar
import {Action} from '@ngrx/store';
import {Offer} from '../../models/offer.model';

export enum OffersActionTypes {
    // Desencadenante de la acción
    GET_OFFERS = '[Offers] Get offers',
    // Respuestas de éxito o error
    GET_OFFERS_SUCCESS = '[Offers] Get offers success',
    GET_OFFERS_FAILED = '[Offers] Get offers failed'
}

// Acciones
export class GetOffers implements Action {
    readonly type = OffersActionTypes.GET_OFFERS;

    constructor() {}
}

export class GetOffersSuccess implements Action {
    readonly type = OffersActionTypes.GET_OFFERS_SUCCESS;

    constructor(public offers: Offer[]) {}
}

export class GetOffersFailed implements Action {
    readonly type = OffersActionTypes.GET_OFFERS_FAILED;

    constructor(public message: string) {}
}

export type OffersActions =
    | GetOffers
    | GetOffersSuccess
    | GetOffersFailed;
