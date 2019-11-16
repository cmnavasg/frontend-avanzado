// Enumeraciones de acciones que puede realizar
import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export enum LanguagesActionTypes {
    // Desencadenante de la acción
    CREATE_LANGUAGE = '[Languages] Create Language',
    // Respuestas de éxito o error
    CREATE_LANGUAGE_SUCCESS = '[Languages] Create Language success',
    CREATE_LANGUAGE_FAILED = '[Languages] Create Language failed',
    // Desencadenante de la acción
    UPDATE_LANGUAGE = '[Languages] Update Language',
    // Respuestas de éxito o error
    UPDATE_LANGUAGE_SUCCESS = '[Languages] Update Language success',
    UPDATE_LANGUAGE_FAILED = '[Languages] Update Language failed',
    // Desencadenante de la acción
    DELETE_LANGUAGE = '[Languages] Delete Language',
    // Respuestas de éxito o error
    DELETE_LANGUAGE_SUCCESS = '[Languages] Delete Language success',
    DELETE_LANGUAGE_FAILED = '[Languages] Delete Language failed'
}

// Acciones
export class CreateLanguage implements Action {
    readonly type = LanguagesActionTypes.CREATE_LANGUAGE;

    constructor(public user: User) {}
}

export class CreateLanguageSuccess implements Action {
    readonly type = LanguagesActionTypes.CREATE_LANGUAGE_SUCCESS;

    constructor(public user: User) {}
}

export class CreateLanguageFailed implements Action {
    readonly type = LanguagesActionTypes.CREATE_LANGUAGE_FAILED;

    constructor(public message: string) {}
}

export class UpdateLanguage implements Action {
    readonly type = LanguagesActionTypes.UPDATE_LANGUAGE;

    constructor(public user: User) {}
}

export class UpdateLanguageSuccess implements Action {
    readonly type = LanguagesActionTypes.UPDATE_LANGUAGE_SUCCESS;

    constructor(public user: User) {}
}

export class UpdateLanguageFailed implements Action {
    readonly type = LanguagesActionTypes.UPDATE_LANGUAGE_FAILED;

    constructor(public message: string) {}
}

export class DeleteLanguage implements Action {
    readonly type = LanguagesActionTypes.DELETE_LANGUAGE;

    constructor(public user: User) {}
}
export class DeleteLanguageSuccess implements Action {
    readonly type = LanguagesActionTypes.DELETE_LANGUAGE_SUCCESS;

    constructor(public user: User) {}
}
export class DeleteLanguageFailed implements Action {
    readonly type = LanguagesActionTypes.DELETE_LANGUAGE_FAILED;

    constructor(public message: string) {}
}

export type LanguagesActions =
    | CreateLanguage
    | CreateLanguageSuccess
    | CreateLanguageFailed
    | UpdateLanguage
    | UpdateLanguageSuccess
    | UpdateLanguageFailed
    | DeleteLanguage
    | DeleteLanguageSuccess
    | DeleteLanguageFailed;
