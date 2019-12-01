import { NgModule } from '@angular/core';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SigninComponent],
  imports: [SharedModule, CommonModule, SigninRoutingModule,
    MatButtonModule, MatInputModule, MatCheckboxModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}), MatToolbarModule],
  providers: []
})
export class SigninModule {}
