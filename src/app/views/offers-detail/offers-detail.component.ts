import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SigninService} from '../signin/signin.service';
import {User} from '../../shared/models/user.model';
import {OfferService} from '../../shared/services/offer.service';
import {Offer} from '../../shared/models/offer.model';

@Component({
  selector: 'app-offers-detail',
  templateUrl: './offers-detail.component.html',
  styleUrls: ['./offers-detail.component.scss']
})
export class OffersDetailComponent implements OnInit {

  usuario: User;
  private idOferta: string;
  private oferta: Offer;
  constructor(private router: Router, private route: ActivatedRoute, private signinService: SigninService,
              private offerService: OfferService) {
    if (this.route.snapshot.paramMap.get('uid')) {
      this.idOferta = this.route.snapshot.paramMap.get('uid');
    }
  }

  ngOnInit() {
    if (this.signinService.getIsUserLoggedIn()) {
      this.usuario = this.signinService.getUserLoggedIn();
      this.offerService.getOferta(Number(this.idOferta)).then(
        res => {
          this.oferta = res[0];
        },
        error => {
          this.oferta = null;
          console.error(error);
        }
      );
    } else {
      this.navigate('/signin');
    }
  }

  inscribirse() {
    this.navigate('/offers');
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
