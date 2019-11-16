import {LanguagesActions, LanguagesActionTypes} from './languages.actions';
import {UserStudentState} from './profile-student.state';

export function userLanguagesInitialState() {
    return {
        user: null
    };
}

const defaultUserState: UserStudentState = {
    ...userLanguagesInitialState()
};

export function languagesReducer(
    state= defaultUserState,
    action: LanguagesActions
): UserStudentState {
    switch (action.type) {
        case LanguagesActionTypes.CREATE_LANGUAGE:
            return {
                ...state,
                user: action.user
            };

        case LanguagesActionTypes.CREATE_LANGUAGE_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case LanguagesActionTypes.CREATE_LANGUAGE_FAILED:
            return {
                ...state,
                user: null
            };
        case LanguagesActionTypes.UPDATE_LANGUAGE:
            return {
                ...state,
                user: action.user
            };

        case LanguagesActionTypes.UPDATE_LANGUAGE_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case LanguagesActionTypes.UPDATE_LANGUAGE_FAILED:
            return {
                ...state,
                user: null
            };

        case LanguagesActionTypes.DELETE_LANGUAGE:
            return {
                ...state,
                user: action.user
            };

        case LanguagesActionTypes.DELETE_LANGUAGE_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case LanguagesActionTypes.DELETE_LANGUAGE_FAILED:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
}
