import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../shared/services/profile.service';
import {SigninService} from '../signin/signin.service';
import {User} from '../../shared/models/user.model';
import {Language, LanguageLevel, LanguageName} from '../../shared/models/language.model';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {

  private idLanguage: string;
  private user: User;
  private language;
  allLanguages: LanguageName[];
  allNiveles: LanguageLevel[];

  idiomaForm = new FormGroup({
    language: new FormControl('', [Validators.required]),
    otro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    nivel: new FormControl(''),
    date: new FormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService,
              private signinService: SigninService) {
    if (this.route.snapshot.paramMap.get('uid')) {
      this.idLanguage = this.route.snapshot.paramMap.get('uid');
    }
  }

  ngOnInit() {
    if (!this.signinService.getUserLoggedIn()) {
      this.navigate('/signin');
    } else {
      this.user = this.signinService.getUserLoggedIn();
      this.profileService.getLanguages().subscribe(
        res => {
          this.allLanguages = res;
        },
        error => {
          this.allLanguages = null;
        }
      );
      this.profileService.getLevelsLanguage().subscribe(
        res => {
          this.allNiveles = res;
        },
        error => {
          this.allNiveles = null;
        }
      );
      if (this.signinService.getUserLoggedIn().languages != null && this.signinService.getUserLoggedIn().languages.length > 0
        && this.idLanguage != null) {
        this.getLanguage(this.idLanguage, this.signinService.getUserLoggedIn().languages);
        if (this.language !== null) {
          this.idiomaForm = new FormGroup({
            language: new FormControl(this.language.name.uid, [Validators.required]),
            otro: new FormControl(''),
            nivel: new FormControl(this.language.level.uid),
            date: new FormControl(this.language.date)
          });
        } else {
          this.idiomaForm = new FormGroup({
            language: new FormControl('', [Validators.required]),
            otro: new FormControl(''),
            nivel: new FormControl(''),
            date: new FormControl('')
          });
        }
      } else {
        this.idiomaForm = new FormGroup({
          language: new FormControl('', [Validators.required]),
          otro: new FormControl(''),
          nivel: new FormControl(''),
          date: new FormControl('')
        });
      }
    }
    this.idiomaForm.get('language').valueChanges
      .subscribe(userCategory => {
        if (this.idiomaForm.get('language').value === 4 || this.idiomaForm.get('language').value === '4') {
            this.idiomaForm.get('otro').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
        } else {
          this.idiomaForm.get('otro').setValidators(null);
        }
        this.idiomaForm.get('otro').updateValueAndValidity();
      });
  }

  getLanguage(uid: string, languages: Language[]) {
    this.language = this.profileService.getLanguage(uid, languages);
  }

  editOrSave(form: FormGroup) {
    const lenguaje = {} as Language;
    if (this.idLanguage != null) {
      lenguaje.uid = Number(this.idLanguage);
    }
    if (form.get('language').value != null) {
      if (form.get('language').value !== 4 && form.get('language').value !== '4') {
        this.profileService.getLanguageName(form.get('language').value).then(
          resN => {
            lenguaje.name = resN[0];
            if (form.get('nivel').value != null) {
              this.profileService.getLevelLanguage(form.get('nivel').value).then(
                resL => {
                  lenguaje.level = resL[0];
                  lenguaje.date = form.get('date').value;
                  this.profileService.updateOrSaveLanguage(lenguaje, this.user)
                    .then(() => this.navigate('/profile-student'));
                  console.log(this.user);
                  this.signinService.setUserLoggedIn(this.user);
                },
                error => {
                  console.log(error);
                }
              );
            } else {
              lenguaje.level = {} as LanguageLevel;
              lenguaje.date = form.get('date').value;
              this.profileService.updateOrSaveLanguage(lenguaje, this.user)
                .then(() => this.navigate('/profile-student'));
              console.log(this.user);
              this.signinService.setUserLoggedIn(this.user);
            }
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.profileService.getLevelsLanguage().subscribe(
          res => {
            lenguaje.name = {} as LanguageName;
            lenguaje.name.uid = res.length;
            lenguaje.name.name = form.get('otro').value;
            if (form.get('nivel').value != null) {
              this.profileService.getLevelLanguage(form.get('nivel').value).then(
                resL => {
                  lenguaje.level = resL[0];
                  lenguaje.date = form.get('date').value;
                  this.profileService.updateOrSaveLanguage(lenguaje, this.user)
                    .then(() => this.navigate('/profile-student'));
                  console.log(this.user);
                  this.signinService.setUserLoggedIn(this.user);
                },
                error => {
                  console.log(error);
                }
              );
            } else {
              lenguaje.level = {} as LanguageLevel;
              lenguaje.date = form.get('date').value;
              this.profileService.updateOrSaveLanguage(lenguaje, this.user)
                .then(() => this.navigate('/profile-student'));
              console.log(this.user);
              this.signinService.setUserLoggedIn(this.user);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    } else {
      lenguaje.name = {} as LanguageName;
      if (form.get('nivel').value != null) {
        this.profileService.getLevelLanguage(form.get('nivel').value).then(
          resL => {
            lenguaje.level = resL[0];
            lenguaje.date = form.get('date').value;
            this.profileService.updateOrSaveLanguage(lenguaje, this.user)
              .then(() => this.navigate('/profile-student'));
            console.log(this.user);
            this.signinService.setUserLoggedIn(this.user);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        lenguaje.level = {} as LanguageLevel;
        lenguaje.date = form.get('date').value;
        this.profileService.updateOrSaveLanguage(lenguaje, this.user)
          .then(() => this.navigate('/profile-student'));
        console.log(this.user);
        this.signinService.setUserLoggedIn(this.user);
      }
    }
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
