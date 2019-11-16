import {User} from '../../models/user.model';
import {CollegeStudy, Study, VocationalStudy} from '../../models/study.model';

export interface AuthState {
    isLogged: boolean;
    loading: boolean;
/*    user: User | null;
    profile: User | null;
    studies: (VocationalStudy|CollegeStudy)[];
 */
}

export const getIsUserLogged = (state: AuthState) => state.isLogged;
