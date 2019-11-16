import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  isOffersList = true;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(
      params => (this.isOffersList = !params.my_offers)
    );
  }

  ngOnInit() {}
}
