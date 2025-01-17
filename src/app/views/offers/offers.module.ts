import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { OffersDetailComponent } from './offers-detail/offers-detail.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OffersProfileComponent } from './offers-profile/offers-profile.component';
import { OffersDetailWrapperComponent } from './offers-detail/offers-detail.component-wrapper';
import {MatCardModule, MatIconModule, MatTableModule} from '@angular/material';
import {StatModule} from '../../shared/modules/stat/stat.module';

@NgModule({
  declarations: [
    OffersComponent,
    OffersProfileComponent,
    OffersListComponent,
    OffersDetailComponent,
    OffersDetailWrapperComponent
  ],
  imports: [CommonModule, OffersRoutingModule, MatTableModule, StatModule, MatIconModule, MatCardModule]
})
export class OffersModule {}
