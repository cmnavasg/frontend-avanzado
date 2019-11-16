import {ProfileStudentActions, ProfileStudentActionTypes} from './profile-student.actions';
import {UserStudentState} from './profile-student.state';

export function userInitialState() {
    return {
        user: null
    };
}

const defaultUserState: UserStudentState = {
    ...userInitialState()
};

export function profileStudentReducer(
    state = defaultUserState,
    action: ProfileStudentActions
): UserStudentState {
    switch (action.type) {
        case ProfileStudentActionTypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case ProfileStudentActionTypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case ProfileStudentActionTypes.GET_PROFILE_FAILED:
            return {
                ...state,
                user: null
            };

        case ProfileStudentActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                user: action.user
            };

        case ProfileStudentActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.user
            };

        case ProfileStudentActionTypes.UPDATE_PROFILE_FAILED:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
}
