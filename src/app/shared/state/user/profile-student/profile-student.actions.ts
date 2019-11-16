// Enumeraciones de acciones que puede realizar
import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export enum ProfileStudentActionTypes {
    // Desencadenante de la acción
    GET_PROFILE = '[ProfileStudent] Get profile',
    // Respuestas de éxito o error
    GET_PROFILE_SUCCESS = '[ProfileStudent] Get profile success',
    GET_PROFILE_FAILED = '[ProfileStudent] Get profile failed',
    // Desencadenante de la acción
    UPDATE_PROFILE = '[ProfileStudent] Update Profile',
    // Respuestas de éxito o error
    UPDATE_PROFILE_SUCCESS = '[ProfileStudent] Update Profile success',
    UPDATE_PROFILE_FAILED = '[ProfileStudent] Update Profile failed',
}

// Acciones
export class GetProfile implements Action {
    readonly type = ProfileStudentActionTypes.GET_PROFILE;

    constructor() {}
}

export class GetProfileSuccess implements Action {
    readonly type = ProfileStudentActionTypes.GET_PROFILE_SUCCESS;

    constructor(public user: User) {}
}

export class GetProfileFailed implements Action {
    readonly type = ProfileStudentActionTypes.GET_PROFILE_FAILED;

    constructor(public message: string) {}
}

export class UpdateProfile implements Action {
    readonly type = ProfileStudentActionTypes.UPDATE_PROFILE;

    constructor(public user: any) {}
}

export class UpdateProfileSuccess implements Action {
    readonly type = ProfileStudentActionTypes.UPDATE_PROFILE_SUCCESS;

    constructor(public user: User) {}
}

export class UpdateProfileFailed implements Action {
    readonly type = ProfileStudentActionTypes.UPDATE_PROFILE_FAILED;

    constructor(public message: string) {}
}

export type ProfileStudentActions =
    | GetProfile
    | GetProfileSuccess
    | GetProfileFailed
    | UpdateProfile
    | UpdateProfileSuccess
    | UpdateProfileFailed;
