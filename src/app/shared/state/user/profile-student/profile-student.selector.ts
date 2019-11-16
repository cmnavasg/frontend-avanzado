import { createSelector, createFeatureSelector } from '@ngrx/store';
import {UserStudentState} from './profile-student.state';

export const selectUserState = createFeatureSelector<UserStudentState>(
    'profile'
);

export const selectUser = createSelector(
    selectUserState,
    state => state.user
);
