import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SigninService} from '../signin/signin.service';
import {User} from '../../shared/models/user.model';
import {
  Category,
  CollegeStudy,
  Grade,
  Institution,
  LevelStudy,
  Study,
  VocationalStudy
} from '../../shared/models/study.model';
import {ProfileService} from '../../shared/services/profile.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-study',
  templateUrl: './profile-study.component.html',
  styleUrls: ['./profile-study.component.scss']
})
export class ProfileStudyComponent implements OnInit {

  private idEstudio: string;
  private user: User;
  private estudio;
  allLevel: LevelStudy[];
  allInstitutions: Institution[];
  allCategories: Category[];
  allGrades: Grade[];
  allTitles: Title[];
  respuestaError;

  constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService,
              private signinService: SigninService) {
    if (this.route.snapshot.paramMap.get('uid')) {
      this.idEstudio = this.route.snapshot.paramMap.get('uid');
    }
  }

  estudioForm = new FormGroup({
    level: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    institution: new FormControl('', [Validators.required]),
    title: new FormControl(''),
    grade: new FormControl(''),
    date: new FormControl(''),
    dual: new FormControl(''),
    bilingue: new FormControl(''),
    certificate: new FormControl('')
  });

  ngOnInit() {
    if (!this.signinService.getUserLoggedIn()) {
      this.navigate('/signin');
    } else {
      this.user = this.signinService.getUserLoggedIn();
      this.profileService.getLevels().subscribe(
        res => {
          this.allLevel = res;
        },
        error => {
          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
        }
      );
      this.profileService.getInstituciones().subscribe(
        res => {
          this.allInstitutions = res;
        },
        error => {
          this.allInstitutions = null;
        }
      );
      this.profileService.getCategorias().subscribe(
        res => {
          this.allCategories = res;
        },
        error => {
          this.allCategories = null;
        }
      );
      this.profileService.getGrados().subscribe(
        res => {
          this.allGrades = res;
        },
        error => {
          this.allGrades = null;
        }
      );
      if (this.signinService.getUserLoggedIn().studies != null && this.signinService.getUserLoggedIn().studies.length > 0
        && this.idEstudio != null) {
        this.getEstudio(this.idEstudio, this.signinService.getUserLoggedIn().studies);
        if (this.estudio.level.uid === 1) {
          this.estudioForm = new FormGroup({
            level: new FormControl(this.estudio.level.uid, [Validators.required]),
            institution: new FormControl(this.estudio.institution.name, [Validators.required]),
            title: new FormControl(this.estudio.title.name, [Validators.required]),
            date: new FormControl(this.estudio.date),
            bilingue: new FormControl(this.estudio.bilingue),
            certificate: new FormControl(''),
            category: new FormControl(''),
            grade: new FormControl(''),
            dual: new FormControl('')
          });
        } else if (this.estudio.level.uid === 2) {
          this.estudioForm = new FormGroup({
            level: new FormControl(this.estudio.level.uid, [Validators.required]),
            institution: new FormControl(this.estudio.institution.uid, [Validators.required]),
            category: new FormControl(this.estudio.category.uid, [Validators.required]),
            grade: new FormControl(this.estudio.grade.uid),
            title: new FormControl(this.estudio.title.name),
            date: new FormControl(this.estudio.date),
            bilingue: new FormControl(this.estudio.bilingue),
            dual: new FormControl(this.estudio.dual),
            certificate: new FormControl('')
          });
        } else {
          this.estudioForm = new FormGroup({
            level: new FormControl(this.estudio.level.uid, [Validators.required]),
            title: new FormControl(this.estudio.title.uid, [Validators.required]),
            date: new FormControl(this.estudio.date, [Validators.required]),
            bilingue: new FormControl(this.estudio.bilingue),
            certificate: new FormControl(''),
            institution: new FormControl(''),
            category: new FormControl(''),
            grade: new FormControl(''),
            dual: new FormControl('')
          });
        }
      } else {
        this.estudioForm = new FormGroup({
          level: new FormControl(''),
          title: new FormControl(''),
          date: new FormControl(''),
          bilingue: new FormControl(''),
          certificate: new FormControl(''),
          institution: new FormControl(''),
          category: new FormControl(''),
          grade: new FormControl(''),
          dual: new FormControl('')
        });
      }
    }
  }

  getEstudio(uid: string, estudios: Study[]) {
    this.estudio = this.profileService.getEstudio(uid, estudios);
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
