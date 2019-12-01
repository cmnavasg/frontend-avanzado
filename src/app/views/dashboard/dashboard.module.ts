import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatTableModule} from '@angular/material';
import {StatModule} from '../../shared/modules/stat/stat.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
