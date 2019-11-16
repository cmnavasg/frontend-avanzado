import {authReducer} from './auth';
import {profileStudentReducer} from './user';
import {studiesReducer} from './user/profile-student/studies.reducer';
import {languagesReducer} from './user/profile-student/languages.reducer';
import {offersReducer} from './offers/offers.reducer';

export const reducers = { auth: authReducer, profile: profileStudentReducer, studies: studiesReducer, languages: languagesReducer,
offers: offersReducer};

