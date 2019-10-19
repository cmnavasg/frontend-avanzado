import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SigninService} from '../signin/signin.service';
import {User} from '../../shared/models/user.model';
import {ProfileService} from "../../shared/services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario: User;
  constructor(private router: Router, private signinService: SigninService, private profileService: ProfileService) {
    this.profileService.getProvinciasIn();
  }

  ngOnInit() {
    if (this.signinService.getIsUserLoggedIn()) {
      this.usuario = this.signinService.getUserLoggedIn();
    } else {
      this.navigate('/signin');
    }
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  editarDatosPersonales() {
    this.router.navigateByUrl('/profile-student/account');
  }

  addEstudio() {
    this.router.navigateByUrl('/profile-student/study');
  }

  editEstudio(id: string) {
    this.router.navigateByUrl('profile-student/study/' + id);
  }

  deleteEstudio(id: string) {
    // codigo
  }

  addIdioma() {
    this.router.navigateByUrl('/profile-student/language');
  }

  editIdioma(id: string) {
    this.router.navigateByUrl('profile-student/language/' + id);
  }

  deleteIdioma(id: string) {
    // codigo
  }

}
