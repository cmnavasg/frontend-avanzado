import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {SigninService} from '../signin/signin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() usuario: User;
  constructor(private signinService: SigninService, private router: Router) {
    this.usuario = this.signinService.getUserLoggedIn();
  }

  ngOnInit() {
    if (!this.usuario) {
      this.navigate('/signin');
    }
  }
  perfil() {
    if (this.signinService.getIsUserLoggedIn()) {
      this.navigate('/profile-student');
    }
  }

  jobOffers() {
    if (this.signinService.getIsUserLoggedIn()) {
      this.navigate('/offers');
    }
  }

  logOut() {
    this.signinService.logOut();
    this.navigate('/signin');
  }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

}
