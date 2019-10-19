import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SigninService} from '../signin/signin.service';
import {DocumentType, Municipe, Province, User, UserAddress} from '../../shared/models/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../shared/services/profile.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {

  usuario: User;
  allDocuments: DocumentType[];
  allProvinces: Province[];
  allMunicipes: Municipe[];
  address: UserAddress;
  prov: Province;
  mun: Municipe;
  respuestaError;
  estado;

  constructor(private router: Router, private signinService: SigninService, private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.usuario = this.signinService.getUserLoggedIn();
    this.allProvinces = this.profileService.recuperarProvincias();
  }
  accountForm = new FormGroup({
    avatar_hash: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
    birthdate: new FormControl(''),
    phone: new FormControl(''),
    phone2: new FormControl(''),
    documentType: new FormControl(''),
    documentNumber: new FormControl(''),
    street: new FormControl(''),
    provincia: new FormControl(''),
    municipio: new FormControl(''),
    permisos: new FormControl(''),
    aboutMe: new FormControl(''),
    otherCompetences: new FormControl('')
  });

  ngOnInit() {
    if (!this.signinService.getUserLoggedIn()) {
      this.navigate('/signin');
    } else {
      this.usuario = this.signinService.getUserLoggedIn();
      this.allDocuments = this.profileService.recuperarProvincias();
      console.log('Provincias');
      console.log(this.allDocuments);
      this.profileService.getDocuments().subscribe(

        res => {
          this.allDocuments = res;
        },
        error => {
          this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
          console.error(error);
        }
      );
      if (this.usuario.address != null && this.usuario.address.province != null) {
        this.profileService.getMunicipes(this.usuario.address.municipe.uidProv).subscribe(

          res => {
            this.allMunicipes = res;
            console.log(res);
          },
          error => {
            this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
            console.error(error);
          }
        );
      }
      this.accountForm = new FormGroup({
        avatar_hash: new FormControl(this.usuario.avatar_hash),
        name: new FormControl(this.usuario.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
        surname: new FormControl(this.usuario.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]),
        // tslint:disable-next-line:max-line-length
        birthdate: new FormControl(this.usuario.birthdate, Validators.pattern('^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$')),
        phone: new FormControl(this.usuario.phone),
        phone2: new FormControl(this.usuario.phone2),
        documentType: new FormControl(this.usuario.documentType.uid),
        documentNumber: new FormControl(this.usuario.documentNumber),
        street: new FormControl(this.usuario.address.street),
        provincia: new FormControl(this.usuario.address.province.uid),
        municipio: new FormControl(this.usuario.address.municipe.uid),
        permisos: new FormControl(this.usuario.license),
        aboutMe: new FormControl(this.usuario.aboutMe),
        otherCompetences: new FormControl(this.usuario.otherCompetences)
      });
    }
  }

  cargarListadoMunicipios(uidProv) {
    this.profileService.getMunicipes(uidProv).subscribe(

      res => {
        this.allMunicipes = res;
        this.usuario.address.municipe = null;
      },
      error => {
        this.respuestaError = 'Ha ocurrido un error en nuestro sistema, inténtelo de nuevo más tarde';
        console.error(error);
      }
    );
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  editAccount(name: string, surname: string, birthdate: string, phone: string, phone2: string, documentType: number,
              documentNumber: string, street: string, provincia: number, municipio: number, permisos: string, aboutMe: string,
              otherCompetences: string, event: Event) {
    event.preventDefault();
    this.usuario.name = name;
    this.usuario.surname = surname;
    this.usuario.birthdate = birthdate;
    this.usuario.phone = phone;
    this.usuario.phone2 = phone2;
    if (documentType != null) {
      if (this.usuario.documentType != null) {
        this.usuario.documentType.uid = documentType;
      } else {
        this.profileService.recuperarTipoDocumento(documentType).subscribe(
          res => {
            this.usuario.documentType = res[0];
          },
          error => {
            this.usuario.documentType = null;
          }
        );
      }
    }
    this.usuario.documentNumber = documentNumber;
    this.address = {} as UserAddress;
    if ((street != null && street !== '') || provincia != null || municipio != null) {
      if (street != null && street !== '') {
        if (provincia != null) {
          if (municipio != null) {
            this.profileService.getProvincia(provincia).then(
              resP => {
                this.prov = resP[0];
                this.profileService.getMunicipio(municipio).then(
                  res => {
                    this.mun = res[0];
                    console.log(municipio);
                    const address: UserAddress = { street, province: this.prov, municipe: this.mun };
                    this.usuario.address = address;
                    this.usuario.license = permisos;
                    this.usuario.aboutMe = aboutMe;
                    this.usuario.otherCompetences = otherCompetences;
                    console.log (this.usuario);
                    this.profileService.updateUser(this.usuario)
                      .subscribe(() => this.navigate('/profile-student'));
                    this.signinService.setUserLoggedIn(this.usuario);
                  },
                  error => {
                    this.mun = null;
                  }
                );
              },
              error => {
                this.mun = null;
              }
            );
          }
        }
      }
    }
  /*  this.profileService.editAccount(this.usuario).subscribe(
      res => {
        console.log(res);
        // @ts-ignore
        if (res.status === 'OK') {
          this.estado = 'OK';
        }
        this.navigate('/profile');
      },
      error => {
        this.estado = 'KO';
        console.error(error);
        this.navigate('/profile');
      }
    );*/
  }

/*  recuperaProvincia(uid) {
    this.profileService.getProvincia(uid).then(
      res => {
        console.log(res[0]);
        this.prov = res[0];
      },
      error => {
        this.prov = null;
      }
    );
  }
 */

  recuperaProvincia(uid) {
    console.log('recupera');
    console.log(this.allProvinces);
    return this.allProvinces.find(
      (prov) => (prov.uid).toString() === uid
    );
  }

  recuperarMunicipio(uid) {
    this.profileService.getMunicipio(uid).then(
      res => {
        console.log(res[0]);
        this.mun = res[0];
      },
      error => {
        this.mun = null;
      }
    );
  }
}
