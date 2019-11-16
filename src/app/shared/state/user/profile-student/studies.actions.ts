// Enumeraciones de acciones que puede realizar
import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';
import {ProfileStudentActionTypes} from './profile-student.actions';

export enum StudiesActionTypes {
    // Desencadenante de la acción
    CREATE_STUDY = '[Studies] Create Study',
    // Respuestas de éxito o error
    CREATE_STUDY_SUCCESS = '[Studies] Create Study success',
    CREATE_STUDY_FAILED = '[Studies] Create Study failed',
    // Desencadenante de la acción
    UPDATE_STUDY = '[Studies] Update Study',
    // Respuestas de éxito o error
    UPDATE_STUDY_SUCCESS = '[Studies] Update Study success',
    UPDATE_STUDY_FAILED = '[Studies] Update Study failed',
    // Desencadenante de la acción
    DELETE_STUDY = '[Studies] Delete Study',
    // Respuestas de éxito o error
    DELETE_STUDY_SUCCESS = '[Studies] Delete Study success',
    DELETE_STUDY_FAILED = '[Studies] Delete Study failed'
}

// Acciones
export class CreateStudy implements Action {
    readonly type = StudiesActionTypes.CREATE_STUDY;

    constructor(public user: any) {}
}

export class CreateStudySuccess implements Action {
    readonly type = StudiesActionTypes.CREATE_STUDY_SUCCESS;

    constructor(public user: User) {}
}

export class CreateStudyFailed implements Action {
    readonly type = StudiesActionTypes.CREATE_STUDY_FAILED;

    constructor(public message: string) {}
}

export class UpdateStudy implements Action {
    readonly type = StudiesActionTypes.UPDATE_STUDY;

    constructor(public user: any) {}
}

export class UpdateStudySuccess implements Action {
    readonly type = StudiesActionTypes.UPDATE_STUDY_SUCCESS;

    constructor(public user: User) {}
}

export class UpdateStudyFailed implements Action {
    readonly type = StudiesActionTypes.UPDATE_STUDY_FAILED;

    constructor(public message: string) {}
}

export class DeleteStudy implements Action {
    readonly type = StudiesActionTypes.DELETE_STUDY;

    constructor(public user: User) {}
}
export class DeleteStudySuccess implements Action {
    readonly type = StudiesActionTypes.DELETE_STUDY_SUCCESS;

    constructor(public user: User) {}
}
export class DeleteStudyFailed implements Action {
    readonly type = StudiesActionTypes.DELETE_STUDY_FAILED;

    constructor(public message: string) {}
}

export type StudiesActions =
    | CreateStudy
    | CreateStudySuccess
    | CreateStudyFailed
    | UpdateStudy
    | UpdateStudySuccess
    | UpdateStudyFailed
    | DeleteStudy
    | DeleteStudySuccess
    | DeleteStudyFailed;
