import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SigninService} from '../signin/signin.service';
import {Province, User} from '../../shared/models/user.model';
import {Offer} from '../../shared/models/offer.model';
import {ProfileService} from '../../shared/services/profile.service';
import {OfferService} from '../../shared/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  usuario: User;
  ofertas: Offer[] = [];
  allProvinces: Province[];
  constructor(private router: Router, private signinService: SigninService, private profileService: ProfileService,
              private offerService: OfferService) { }

  ngOnInit() {
    if (this.signinService.getIsUserLoggedIn()) {
      this.usuario = this.signinService.getUserLoggedIn();
      this.offerService.getOfertas().subscribe(
        res => {
          const allOffers = res;
          const titulos = this.profileService.getDistinctTitles(this.usuario);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < allOffers.length; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < allOffers[i].title.length; j++) {
              if (titulos.indexOf(allOffers[i].title[j].uid) !== -1) {
                this.ofertas.push(allOffers[i]);
              }
            }
          }
          this.profileService.getProvinces().then(
            resP => {
              this.allProvinces = resP;
            },
            error => {
              this.allProvinces = null;
              console.error(error);
            }
          );
        },
        error => {
          this.ofertas = null;
        }
      );
    } else {
      this.navigate('/signin');
    }
  }

  verOferta(id: string) {
    this.navigate('offers/offers-detail/' + id);
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
