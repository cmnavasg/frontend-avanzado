import {StudiesActions, StudiesActionTypes} from './studies.actions';
import {UserStudentState} from './profile-student.state';

export function userStudiesInitialState() {
    return {
        user: null
    };
}

const defaultUserState: UserStudentState = {
    ...userStudiesInitialState()
};

export function studiesReducer(
    state= defaultUserState ,
    action: StudiesActions
): UserStudentState {
    switch (action.type) {
        case StudiesActionTypes.CREATE_STUDY:
            return {
                ...state,
                user: action.user
            };

        case StudiesActionTypes.CREATE_STUDY_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case StudiesActionTypes.CREATE_STUDY_FAILED:
            return {
                ...state,
                user: null
            };
        case StudiesActionTypes.UPDATE_STUDY:
            return {
                ...state,
                user: action.user
            };

        case StudiesActionTypes.UPDATE_STUDY_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case StudiesActionTypes.UPDATE_STUDY_FAILED:
            return {
                ...state,
                user: null
            };

        case StudiesActionTypes.DELETE_STUDY:
            return {
                ...state,
                user: action.user
            };

        case StudiesActionTypes.DELETE_STUDY_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case StudiesActionTypes.DELETE_STUDY_FAILED:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
}
