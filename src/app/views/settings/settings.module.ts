import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {StatModule} from '../../shared/modules/stat/stat.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SettingsComponent} from './settings.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    SettingsRoutingModule,
    MatGridListModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
