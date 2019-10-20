import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
/* import { UserOptions } from '../models/user'; */
import {HttpClient, HttpParams} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {DocumentType, Municipe, Province, User} from '../models/user.model';
import {catchError, tap} from 'rxjs/operators';
import {
  Category,
  CollegeStudy,
  Grade,
  Institution,
  LevelStudy,
  Study,
  TitleStudy,
  VocationalStudy
} from '../models/study.model';
import {Language, LanguageLevel, LanguageName} from '../models/language.model';
/* import { AppStore } from '../states/store.inteface';
import { Store } from '@ngrx/store';
import * as UserActions from 'app/shared/states/user/actions';
import { User } from 'app/shared/models/user'; */

@Injectable()
export class ProfileService {
 /* private mockUser = {
    uid: 'ajvazquez',
    name: 'Antonio Jesús',
    surname: 'Vázquez Muñoz',
    email: 'antoniojesusvazquezmunozz@gmail.com',
    roles: [AppSettings.COMPANY_ROL.value],
    avatar_hash: 'ef72d0e94ba5015d64de8522d845cfd2',
    parents: [],
    childrens: [],
    hasFailed: false,
    studies: {
      action: 'SHOW',
      entities: [
        {
          uid: 0,
          level: 'Ciclo formativo',
          title: 'Desarrollo de aplicaciones web',
          institution: 'IES Politécnico Jesús Marin',
          date: '1548320228',
          certificate: false
        },
        {
          uid: 1,
          level: 'Ciclo formativo',
          title: 'Administracion de sistemas informaticos y redes',
          institution: 'IES Politécnico Jesús Marin',
          date: '1397293028',
          certificate: true
        }
      ]
    },
    experiences: {
      action: 'SHOW',
      entities: [
        {
          uid: 0,
          company: 'Suma',
          position: 'Junior',
          date: '1548320228'
        },
        {
          uid: 0,
          company: 'Indra',
          position: 'engineer',
          date: '1548320228'
        }
      ]
    },

    languages: {
      action: 'SHOW',
      entities: [
        {
          uid: 0,
          level: '6',
          name: 'English',
          date: '1548320228'
        },
        {
          uid: 0,
          level: '4',
          name: 'French',
          date: '1548320228'
        }
      ]
    },

    offers: {
      entities: [
        {
          position: 'Professor Extraescolars programació i robòtica educativa',
          company: 'Eixos Creativa',
          family: 'Informática y Comunicaciones',
          date: '30/01/2019'
        },
        {
          position: 'Programaador Jr Java',
          company: 'Ki - Works',
          family: 'Informática y Comunicaciones',
          date: '28/01/2019'
        },
        {
          position: 'Programador.net',
          company: 'Tecnic Consultores',
          family: 'Informática y Comunicaciones',
          date: '28/01/2019'
        },
        {
          position: 'Programador Junior Java Spring boot',
          company: 'GRUPO CMC',
          family: 'Informática y Comunicaciones',
          date: '25/01/2019'
        },
        {
          position: 'Administrativa',
          company: 'Servium',
          family: 'Administración y Gestión',
          date: '25/01/2019'
        },
        {
          position: 'DESARROLLADOR/A SOFTWARE',
          company: 'PEPPER',
          family: 'Informática y Comunicaciones',
          date: '23/01/2019'
        }
      ]
    }
  } as any /* UserOptions */ /*; */
  user: User;
  allDocuments: DocumentType[];
  allProvinces: Province[];
  allMunicipes: Municipe[];

  constructor(
    private http: HttpClient /* , private store$: Store<AppStore> */
  ) {}

  getDocuments(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(AppSettings.API_ENDPOINT_DOCUMENTS);
  }

  getProvinces(): Promise<Province[]> {
    return this.http.get<Province[]>(AppSettings.API_ENDPOINT_PROVINCES).toPromise();
  }

  getProvinciasIn() {
    this.getProvinces().then(
      res => {
        this.allProvinces = res;
      },
      error => {
        this.allProvinces = null;
        console.error(error);
      }
    );
  }

  recuperarProvincias() {
    return this.allProvinces;
  }

  getMunicipes(uidProv): Observable<Municipe[]> {
    const params = new HttpParams()
      .set('uidProv', uidProv);
    return this.http.get<Municipe[]>(AppSettings.API_ENDPOINT_MUNICIPES, {params});
  }

  getLevels(): Observable<LevelStudy[]> {
    return this.http.get<LevelStudy[]>(AppSettings.API_ENDPOINT_LEVELS);
  }

  getLevel(uidLevel): Observable<LevelStudy[]> {
    const params = new HttpParams()
      .set('uid', uidLevel);
    return this.http.get<LevelStudy[]>(AppSettings.API_ENDPOINT_LEVELS, {params});
  }

  getInstitution(uidInstitution): Observable<Institution[]> {
    const params = new HttpParams()
      .set('uid', uidInstitution);
    return this.http.get<Institution[]>(AppSettings.API_ENDPOINT_INSTITUTIONS, {params});
  }

  getCategory(uidCategory): Observable<Category[]> {
    const params = new HttpParams()
      .set('uid', uidCategory);
    return this.http.get<Category[]>(AppSettings.API_ENDPOINT_CATEGORIES, {params});
  }

  getGrade(uidGrade): Observable<Grade[]> {
    const params = new HttpParams()
      .set('uid', uidGrade);
    return this.http.get<Grade[]>(AppSettings.API_ENDPOINT_GRADES, {params});
  }

  getTitle(uidTitle): Observable<TitleStudy[]> {
    const params = new HttpParams()
      .set('uid', uidTitle);
    return this.http.get<TitleStudy[]>(AppSettings.API_ENDPOINT_TITLES, {params});
  }

  getEstudio(uid, studies) {
    console.log(studies.find(
      (study) => (study.uid).toString() === uid));
    return studies.find(
      (study) => (study.uid).toString() === uid
    );
  }
  recuperarTipoDocumento(uid) {
    const params = new HttpParams()
      .set('uid', uid);
    return this.http.get<Municipe[]>(AppSettings.API_ENDPOINT_DOCUMENTS, {params});
  }

  getProvincia(uid) {
    const params = new HttpParams()
      .set('uid', uid);
    return this.http.get<Municipe[]>(AppSettings.API_ENDPOINT_PROVINCES, {params}).toPromise();
  }

  getMunicipio(uid) {
    const params = new HttpParams()
      .set('uid', uid);
    return this.http.get<Municipe[]>(AppSettings.API_ENDPOINT_MUNICIPES, {params}).toPromise();
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(AppSettings.API_ENDPOINT_USERS, user);
  }

  getInstituciones(): Observable<Institution[]> {
    return this.http.get<Institution[]>(AppSettings.API_ENDPOINT_INSTITUTIONS);
  }

  getGrados(): Observable<Grade[]> {
    return this.http.get<Grade[]>(AppSettings.API_ENDPOINT_GRADES);
  }

  getCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(AppSettings.API_ENDPOINT_CATEGORIES);
  }

  getTitles(): Observable<TitleStudy[]> {
    return this.http.get<TitleStudy[]>(AppSettings.API_ENDPOINT_TITLES);
  }

  getCiclos(uidCategory, uidGrade): Observable<TitleStudy[]> {
    if (uidCategory == null) {
      const params = new HttpParams()
        .set('uidGrade', uidGrade);
      return this.http.get<TitleStudy[]>(AppSettings.API_ENDPOINT_TITLES, {params});
    } else if (uidGrade == null) {
        const params = new HttpParams()
          .set('uidCategory', uidCategory);
        return this.http.get<TitleStudy[]>(AppSettings.API_ENDPOINT_TITLES, {params});
    } else {
      const params = new HttpParams()
        .set('uidCategory', uidCategory)
        .set('uidGrade', uidGrade);
      return this.http.get<TitleStudy[]>(AppSettings.API_ENDPOINT_TITLES, {params});
    }
  }

  updateOrSaveEstudio(study: VocationalStudy|CollegeStudy, user: User): Promise<User> {
    if (study.uid) {
      if (study.level.uid === 1) {
        user.studies[study.uid - 1] = {} as CollegeStudy;
        user.studies[study.uid - 1] = study;
      } else if (study.level.uid === 2) {
        user.studies[study.uid - 1] = {} as VocationalStudy;
        user.studies[study.uid - 1] = study;
      }
    } else {
      study.uid = user.studies.length + 1;
      if (study.level.uid === 1) {
        user.studies[study.uid - 1] = {} as CollegeStudy;
        user.studies[study.uid - 1] = study;
      } else if (study.level.uid === 2) {
        user.studies[study.uid - 1] = {} as VocationalStudy;
        user.studies[study.uid - 1] = study;
      }
    }
    return this.updateUser(user).toPromise();
  }

  deleteStudy(uid: number, user: User): Promise<any> {
    const study = this.getEstudio(uid.toString(), user.studies);
    const index: number = user.studies.indexOf(study);
    if (index !== -1) {
      user.studies.splice(index, 1);
    }
    return this.updateUser(user).toPromise();
  }

  deleteLanguage(uid: number, user: User): Promise<any> {
    const lang = this.getLanguage(uid.toString(), user.languages);
    const index: number = user.languages.indexOf(lang);
    if (index !== -1) {
      user.languages.splice(index, 1);
    }
    return this.updateUser(user).toPromise();
  }

  getLanguage(uid, languages) {
    return languages.find(
      (language) => (language.uid).toString() === uid
    );
  }

  getLanguages(): Observable<LanguageName[]> {
    return this.http.get<LanguageName[]>(AppSettings.API_ENDPOINT_LANGUAGES);
  }
  getLevelLanguage(uid) {
    const params = new HttpParams()
      .set('uid', uid);
    return this.http.get<LanguageLevel[]>(AppSettings.API_ENDPOINT_LEVELS_LAN, {params}).toPromise();
  }

  getLanguageName(uid) {
    const params = new HttpParams()
      .set('uid', uid);
    return this.http.get<LanguageName[]>(AppSettings.API_ENDPOINT_LANGUAGES, {params}).toPromise();
  }

  getLevelsLanguage(): Observable<LanguageLevel[]> {
    return this.http.get<LanguageLevel[]>(AppSettings.API_ENDPOINT_LEVELS_LAN);
  }

  updateOrSaveLanguage(language: Language, user: User): Promise<User> {
    if (language.uid) {
      user.languages[language.uid - 1] = language;
    } else {
      language.uid = user.languages.length + 1;
      user.languages[language.uid - 1] = language;
    }
    return this.updateUser(user).toPromise();
  }

  getDistinctTitles(user: User) {
      const result = [];
      const allTitles = user.studies;
      for (let i = 0; i < allTitles.length; i++) {
        if (result.indexOf(user.studies[i].title.uid) === -1) {
          console.log(user.studies[i].title.uid);
          result.push(user.studies[i].title.uid);
        }
      }
      return result;
  }
/*  editAccount(user: User): Observable<any> {
    return this.http.put(AppSettings.API_ENDPOINT_USER, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<>('updateHero'))
    );
  }
*/
  loadProfile(): Observable<User> {
    return of(this.user as User);
    // return this.http.get<UserOptions>(AppSettings.API_ENDPOINT_USER_ME);
  }
  logout(): void {
    /*  this.store$.dispatch(new UserActions.Logout()); */
  }
  public updateProfile(profile: User /* User */): Observable<User /* User */> {
    /*if (Math.random() > 0.5) {
      return this.http.put<TokenResponse>(AppSettings.API_ENDPOINT_USER_ME, profile);
    }*/
    this.user = { ...profile };
    return of(this.user as User /* User */);
  }
  public signupProfile(profile: any /* UserOptions */): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_USER_CREATE,
      profile
    );
  }
  public requestRememberPassword(uid: { uid: string }): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_USER_REQUEST_REMEMBER_PASSWORD,
      uid
    );
  }
  public rememberPassword(uidAndHash: {
    uid: string;
    hash: string;
  }): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_USER_REMEMBER_PASSWORD,
      uidAndHash
    );
  }
  public confirmUser(uidAndHash: {
    uid: string;
    hash: string;
  }): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_CONFIRM_USER,
      uidAndHash
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
