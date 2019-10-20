import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SigninService} from '../signin/signin.service';
import {User} from '../../shared/models/user.model';
import {
  Category,
  CollegeStudy,
  Grade,
  Institution,
  LevelStudy,
  Study, TitleStudy,
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
  allTitles: TitleStudy[];
  respuestaError;

  constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileService,
              private signinService: SigninService) {
    if (this.route.snapshot.paramMap.get('uid')) {
      this.idEstudio = this.route.snapshot.paramMap.get('uid');
    }
  }

  estudioForm = new FormGroup({
    level: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    institution: new FormControl(''),
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
        if (this.estudio.category && this.estudio.grade) {
          this.cargarListadoCiclos(this.estudio.category.uid, this.estudio.grade.uid);
        } else if (this.estudio.grade) {
          this.cargarListadoCiclos(null, this.estudio.grade.uid);
        } else if (this.estudio.category) {
          this.cargarListadoCiclos(this.estudio.category.uid, null);
        }
        if (this.estudio.level.uid === 1) {
          this.estudioForm = new FormGroup({
            level: new FormControl(this.estudio.level.uid, [Validators.required]),
            institution: new FormControl(this.estudio.institution.name),
            title: new FormControl(this.estudio.title.name),
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
            institution: new FormControl(this.estudio.institution.uid),
            category: new FormControl(this.estudio.category.uid),
            grade: new FormControl(this.estudio.grade.uid),
            title: new FormControl(this.estudio.title.uid),
            date: new FormControl(this.estudio.date),
            bilingue: new FormControl(this.estudio.bilingue),
            dual: new FormControl(this.estudio.dual),
            certificate: new FormControl('')
          });
        } else {
          this.estudioForm = new FormGroup({
            level: new FormControl(this.estudio.level.uid, [Validators.required]),
            title: new FormControl(this.estudio.title.uid),
            date: new FormControl(this.estudio.date),
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
          level: new FormControl('', [Validators.required]),
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

  cargarListadoCiclos(uidCat: number, uidGrad: number) {
    let cat;
    let grad;
    if (uidCat == null || uidCat.toString().includes('null')) {
      cat = null;
    } else {
      cat = uidCat;
    }
    if (uidGrad == null || uidGrad.toString().includes('null')) {
      grad = null;
    } else {
      grad = uidGrad;
    }
    this.profileService.getCiclos(cat, grad).subscribe(

      res => {
        this.allTitles = res;
        console.log(this.allTitles);
      },
      error => {
        this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
        console.error(error);
      }
    );
  }
  cargarListadoCiclosFormulario(form: FormGroup) {
    let cat;
    let grad;
    if (form.get('category').value == null || form.get('category').value.toString().includes('null')) {
      cat = null;
    } else {
      cat = form.get('category').value;
    }
    if (form.get('grade').value == null || form.get('grade').value.toString().includes('null')) {
      grad = null;
    } else {
      grad = form.get('grade').value;
    }
    this.profileService.getCiclos(cat, grad).subscribe(
      res => {
        this.allTitles = res;
        if (this.estudio && this.estudio.title) {
          this.estudio.title.uid = null;
        }
        console.log(this.allTitles);
      },
      error => {
        this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
        console.error(error);
      }
    );
  }

  editOrSave(form: FormGroup) {
    if (form.get('level').value === 1 || form.get('level').value === '1') {
      const collegeStudy = {} as CollegeStudy;
      this.profileService.getLevel(form.get('level').value).subscribe(
        resL => {
          collegeStudy.level = resL[0];
          if (form.get('title').value != null && form.get('title').value !== '') {
            this.profileService.getTitles().subscribe(
              res => {
                this.allTitles = res;
                const title = {} as TitleStudy;
                title.uid = this.allTitles.length + 1;
                title.name = form.get('title').value;
                title.uidGrade = null;
                title.uidCategory = null;
                collegeStudy.title = title;
                collegeStudy.institution = form.get('institution').value;
                collegeStudy.date = form.get('date').value;
                collegeStudy.bilingue = form.get('bilingue').value;
                if (form.get('certificate').value) {
                  collegeStudy.certificate = true;
                } else {
                  collegeStudy.certificate = false;
                }
                if (this.idEstudio != null) {
                  collegeStudy.uid = Number(this.idEstudio);
                }
                this.profileService.updateOrSaveEstudio(collegeStudy, this.user)
                  .then(() => this.navigate('/profile-student'));
                console.log(this.user);
                this.signinService.setUserLoggedIn(this.user);
              },
              error => {
                console.log(error);
              }
            );
          } else {
            collegeStudy.institution = form.get('institution').value;
            collegeStudy.title = {} as TitleStudy;
            collegeStudy.date = form.get('date').value;
            collegeStudy.bilingue = form.get('bilingue').value;
            if (form.get('certificate').value) {
              collegeStudy.certificate = true;
            } else {
              collegeStudy.certificate = false;
            }
            if (this.idEstudio != null) {
              collegeStudy.uid = Number(this.idEstudio);
            }
            this.profileService.updateOrSaveEstudio(collegeStudy, this.user)
              .then(() => this.navigate('/profile-student'));
            this.signinService.setUserLoggedIn(this.user);
          }
        },
        error => {
          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
          console.error(error);
        }
      );
    } else  if (form.get('level').value === 2 || form.get('level').value === '2') {
      const vocationalStudy = {} as VocationalStudy;
      this.profileService.getLevel(form.get('level').value).subscribe(
        resL => {
          vocationalStudy.level = resL[0];
          if (form.get('institution') != null) {
            this.profileService.getInstitution(form.get('institution').value).subscribe(
              resI => {
                vocationalStudy.institution = resI[0];
                if (form.get('category') != null) {
                  this.profileService.getCategory(form.get('category').value).subscribe(
                    resC => {
                      vocationalStudy.category = resC[0];
                      if (form.get('grade') != null) {
                        this.profileService.getGrade(form.get('grade').value).subscribe(
                          resG => {
                            vocationalStudy.grade = resG[0];
                            if (form.get('title') != null) {
                              this.profileService.getTitle(form.get('title').value).subscribe(
                                resT => {
                                  vocationalStudy.title = resT[0];
                                  vocationalStudy.dual = form.get('dual').value;
                                  vocationalStudy.date = form.get('date').value;
                                  vocationalStudy.bilingue = form.get('bilingue').value;
                                  if (form.get('certificate').value) {
                                    vocationalStudy.certificate = true;
                                  } else {
                                    vocationalStudy.certificate = false;
                                  }
                                  if (this.idEstudio != null) {
                                    vocationalStudy.uid = Number(this.idEstudio);
                                  }
                                  this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                                    .then(() => this.navigate('/profile-student'));
                                  this.signinService.setUserLoggedIn(this.user);
                                },
                                error => {
                                  this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                                  console.error(error);
                                }
                              );
                            } else {
                              vocationalStudy.title = {} as TitleStudy;
                              vocationalStudy.dual = form.get('dual').value;
                              vocationalStudy.date = form.get('date').value;
                              vocationalStudy.bilingue = form.get('bilingue').value;
                              if (form.get('certificate').value) {
                                vocationalStudy.certificate = true;
                              } else {
                                vocationalStudy.certificate = false;
                              }
                              if (this.idEstudio != null) {
                                vocationalStudy.uid = Number(this.idEstudio);
                              }
                              this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                                .then(() => this.navigate('/profile-student'));
                              this.signinService.setUserLoggedIn(this.user);
                            }
                          },
                          error => {
                            this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                            console.error(error);
                          }
                        );
                      } else {
                        vocationalStudy.grade = {} as Grade;
                        if (form.get('title') != null) {
                          this.profileService.getTitle(form.get('title').value).subscribe(
                            resT => {
                              vocationalStudy.title = resT[0];
                              vocationalStudy.dual = form.get('dual').value;
                              vocationalStudy.date = form.get('date').value;
                              vocationalStudy.bilingue = form.get('bilingue').value;
                              if (form.get('certificate').value) {
                                vocationalStudy.certificate = true;
                              } else {
                                vocationalStudy.certificate = false;
                              }
                              if (this.idEstudio != null) {
                                vocationalStudy.uid = Number(this.idEstudio);
                              }
                              this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                                .then(() => this.navigate('/profile-student'));
                              this.signinService.setUserLoggedIn(this.user);
                            },
                            error => {
                              this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                              console.error(error);
                            }
                          );
                        } else {
                          vocationalStudy.title = {} as TitleStudy;
                          vocationalStudy.dual = form.get('dual').value;
                          vocationalStudy.date = form.get('date').value;
                          vocationalStudy.bilingue = form.get('bilingue').value;
                          if (form.get('certificate').value) {
                            vocationalStudy.certificate = true;
                          } else {
                            vocationalStudy.certificate = false;
                          }
                          if (this.idEstudio != null) {
                            vocationalStudy.uid = Number(this.idEstudio);
                          }
                          this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                            .then(() => this.navigate('/profile-student'));
                          this.signinService.setUserLoggedIn(this.user);
                        }
                      }
                    },
                    error => {
                      this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                      console.error(error);
                    }
                  );
                } else {
                  vocationalStudy.category = {} as Category;
                  if (form.get('grade') != null) {
                    this.profileService.getGrade(form.get('grade').value).subscribe(
                      resG => {
                        vocationalStudy.grade = resG[0];
                        if (form.get('title') != null) {
                          this.profileService.getTitle(form.get('title').value).subscribe(
                            resT => {
                              vocationalStudy.title = resT[0];
                              vocationalStudy.dual = form.get('dual').value;
                              vocationalStudy.date = form.get('date').value;
                              vocationalStudy.bilingue = form.get('bilingue').value;
                              if (form.get('certificate').value) {
                                vocationalStudy.certificate = true;
                              } else {
                                vocationalStudy.certificate = false;
                              }
                              if (this.idEstudio != null) {
                                vocationalStudy.uid = Number(this.idEstudio);
                              }
                              this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                                .then(() => this.navigate('/profile-student'));
                              this.signinService.setUserLoggedIn(this.user);
                            },
                            error => {
                              this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                              console.error(error);
                            }
                          );
                        } else {
                          vocationalStudy.title = {} as TitleStudy;
                          vocationalStudy.dual = form.get('dual').value;
                          vocationalStudy.date = form.get('date').value;
                          vocationalStudy.bilingue = form.get('bilingue').value;
                          if (form.get('certificate').value) {
                            vocationalStudy.certificate = true;
                          } else {
                            vocationalStudy.certificate = false;
                          }
                          if (this.idEstudio != null) {
                            vocationalStudy.uid = Number(this.idEstudio);
                          }
                          this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                            .then(() => this.navigate('/profile-student'));
                          this.signinService.setUserLoggedIn(this.user);
                        }
                      },
                      error => {
                        this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                        console.error(error);
                      }
                    );
                  } else {
                    vocationalStudy.grade = {} as Grade;
                    if (form.get('title') != null) {
                      this.profileService.getTitle(form.get('title').value).subscribe(
                        resT => {
                          vocationalStudy.title = resT[0];
                          vocationalStudy.dual = form.get('dual').value;
                          vocationalStudy.date = form.get('date').value;
                          vocationalStudy.bilingue = form.get('bilingue').value;
                          if (form.get('certificate').value) {
                            vocationalStudy.certificate = true;
                          } else {
                            vocationalStudy.certificate = false;
                          }
                          if (this.idEstudio != null) {
                            vocationalStudy.uid = Number(this.idEstudio);
                          }
                          this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                            .then(() => this.navigate('/profile-student'));
                          this.signinService.setUserLoggedIn(this.user);
                        },
                        error => {
                          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                          console.error(error);
                        }
                      );
                    } else {
                      vocationalStudy.title = {} as TitleStudy;
                      vocationalStudy.dual = form.get('dual').value;
                      vocationalStudy.date = form.get('date').value;
                      vocationalStudy.bilingue = form.get('bilingue').value;
                      if (form.get('certificate').value) {
                        vocationalStudy.certificate = true;
                      } else {
                        vocationalStudy.certificate = false;
                      }
                      if (this.idEstudio != null) {
                        vocationalStudy.uid = Number(this.idEstudio);
                      }
                      this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                        .then(() => this.navigate('/profile-student'));
                      this.signinService.setUserLoggedIn(this.user);
                    }
                  }
                }
              },
              error => {
                this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                console.error(error);
              }
            );
          } else {
            vocationalStudy.institution = {} as Institution;
            if (form.get('category') != null) {
              this.profileService.getCategory(form.get('category').value).subscribe(
                resC => {
                  vocationalStudy.category = resC[0];
                  if (form.get('grade') != null) {
                    this.profileService.getGrade(form.get('grade').value).subscribe(
                      resG => {
                        vocationalStudy.grade = resG[0];
                        if (form.get('title') != null) {
                          this.profileService.getTitle(form.get('title').value).subscribe(
                            resT => {
                              vocationalStudy.title = resT[0];
                              vocationalStudy.dual = form.get('dual').value;
                              vocationalStudy.date = form.get('date').value;
                              vocationalStudy.bilingue = form.get('bilingue').value;
                              if (form.get('certificate').value) {
                                vocationalStudy.certificate = true;
                              } else {
                                vocationalStudy.certificate = false;
                              }
                              if (this.idEstudio != null) {
                                vocationalStudy.uid = Number(this.idEstudio);
                              }
                              this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                                .then(() => this.navigate('/profile-student'));
                              this.signinService.setUserLoggedIn(this.user);
                            },
                            error => {
                              this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                              console.error(error);
                            }
                          );
                        } else {
                          vocationalStudy.title = {} as TitleStudy;
                          vocationalStudy.dual = form.get('dual').value;
                          vocationalStudy.date = form.get('date').value;
                          vocationalStudy.bilingue = form.get('bilingue').value;
                          if (form.get('certificate').value) {
                            vocationalStudy.certificate = true;
                          } else {
                            vocationalStudy.certificate = false;
                          }
                          if (this.idEstudio != null) {
                            vocationalStudy.uid = Number(this.idEstudio);
                          }
                          this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                            .then(() => this.navigate('/profile-student'));
                          this.signinService.setUserLoggedIn(this.user);
                        }
                      },
                      error => {
                        this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                        console.error(error);
                      }
                    );
                  } else {
                    vocationalStudy.grade = {} as Grade;
                    if (form.get('title') != null) {
                      this.profileService.getTitle(form.get('title').value).subscribe(
                        resT => {
                          vocationalStudy.title = resT[0];
                          vocationalStudy.dual = form.get('dual').value;
                          vocationalStudy.date = form.get('date').value;
                          vocationalStudy.bilingue = form.get('bilingue').value;
                          if (form.get('certificate').value) {
                            vocationalStudy.certificate = true;
                          } else {
                            vocationalStudy.certificate = false;
                          }
                          if (this.idEstudio != null) {
                            vocationalStudy.uid = Number(this.idEstudio);
                          }
                          this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                            .then(() => this.navigate('/profile-student'));
                          this.signinService.setUserLoggedIn(this.user);
                        },
                        error => {
                          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                          console.error(error);
                        }
                      );
                    } else {
                      vocationalStudy.title = {} as TitleStudy;
                      vocationalStudy.dual = form.get('dual').value;
                      vocationalStudy.date = form.get('date').value;
                      vocationalStudy.bilingue = form.get('bilingue').value;
                      if (form.get('certificate').value) {
                        vocationalStudy.certificate = true;
                      } else {
                        vocationalStudy.certificate = false;
                      }
                      if (this.idEstudio != null) {
                        vocationalStudy.uid = Number(this.idEstudio);
                      }
                      this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                        .then(() => this.navigate('/profile-student'));
                      this.signinService.setUserLoggedIn(this.user);
                    }
                  }
                },
                error => {
                  this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                  console.error(error);
                }
              );
            } else {
              vocationalStudy.category = {} as Category;
              if (form.get('grade') != null) {
                this.profileService.getGrade(form.get('grade').value).subscribe(
                  resG => {
                    vocationalStudy.grade = resG[0];
                    if (form.get('title') != null) {
                      this.profileService.getTitle(form.get('title').value).subscribe(
                        resT => {
                          vocationalStudy.title = resT[0];
                          vocationalStudy.dual = form.get('dual').value;
                          vocationalStudy.date = form.get('date').value;
                          vocationalStudy.bilingue = form.get('bilingue').value;
                          if (form.get('certificate').value) {
                            vocationalStudy.certificate = true;
                          } else {
                            vocationalStudy.certificate = false;
                          }
                          if (this.idEstudio != null) {
                            vocationalStudy.uid = Number(this.idEstudio);
                          }
                          this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                            .then(() => this.navigate('/profile-student'));
                          this.signinService.setUserLoggedIn(this.user);
                        },
                        error => {
                          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                          console.error(error);
                        }
                      );
                    } else {
                      vocationalStudy.title = {} as TitleStudy;
                      vocationalStudy.dual = form.get('dual').value;
                      vocationalStudy.date = form.get('date').value;
                      vocationalStudy.bilingue = form.get('bilingue').value;
                      if (form.get('certificate').value) {
                        vocationalStudy.certificate = true;
                      } else {
                        vocationalStudy.certificate = false;
                      }
                      if (this.idEstudio != null) {
                        vocationalStudy.uid = Number(this.idEstudio);
                      }
                      this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                        .then(() => this.navigate('/profile-student'));
                      this.signinService.setUserLoggedIn(this.user);
                    }
                  },
                  error => {
                    this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                    console.error(error);
                  }
                );
              } else {
                vocationalStudy.grade = {} as Grade;
                if (form.get('title') != null) {
                  this.profileService.getTitle(form.get('title').value).subscribe(
                    resT => {
                      vocationalStudy.title = resT[0];
                      vocationalStudy.dual = form.get('dual').value;
                      vocationalStudy.date = form.get('date').value;
                      vocationalStudy.bilingue = form.get('bilingue').value;
                      if (form.get('certificate').value) {
                        vocationalStudy.certificate = true;
                      } else {
                        vocationalStudy.certificate = false;
                      }
                      if (this.idEstudio != null) {
                        vocationalStudy.uid = Number(this.idEstudio);
                      }
                      this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                        .then(() => this.navigate('/profile-student'));
                      this.signinService.setUserLoggedIn(this.user);
                    },
                    error => {
                      this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
                      console.error(error);
                    }
                  );
                } else {
                  vocationalStudy.title = {} as TitleStudy;
                  vocationalStudy.dual = form.get('dual').value;
                  vocationalStudy.date = form.get('date').value;
                  vocationalStudy.bilingue = form.get('bilingue').value;
                  if (form.get('certificate').value) {
                    vocationalStudy.certificate = true;
                  } else {
                    vocationalStudy.certificate = false;
                  }
                  if (this.idEstudio != null) {
                    vocationalStudy.uid = Number(this.idEstudio);
                  }
                  this.profileService.updateOrSaveEstudio(vocationalStudy, this.user)
                    .then(() => this.navigate('/profile-student'));
                  this.signinService.setUserLoggedIn(this.user);
                }
              }
            }
          }
        },
        error => {
          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
          console.error(error);
        }
      );
    }
  }

  getEstudio(uid: string, estudios: Study[]) {
    this.estudio = this.profileService.getEstudio(uid, estudios);
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
