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
            otro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            nivel: new FormControl(this.language.level.uid),
            date: new FormControl(this.language.date)
          });
        } else {
          this.idiomaForm = new FormGroup({
            language: new FormControl('', [Validators.required]),
            otro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            nivel: new FormControl(''),
            date: new FormControl('')
          });
        }
      } else {
        this.idiomaForm = new FormGroup({
          language: new FormControl('', [Validators.required]),
          otro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
          nivel: new FormControl(''),
          date: new FormControl('')
        });
      }
    }
  }

  getLanguage(uid: string, languages: Language[]) {
    this.language = this.profileService.getLanguage(uid, languages);
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
