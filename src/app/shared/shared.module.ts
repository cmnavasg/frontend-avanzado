import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/*
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; */

// COMPONENTS
import { AppComfirmComponent } from './services/app-confirm/app-confirm.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

// DIRECTIVES

// PIPES

// SERVICES
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopnavComponent} from './components/topnav/topnav.component';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

const declarations = [AppComfirmComponent, AdminLayoutComponent, SidebarComponent, TopnavComponent];
const exports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  AppComfirmComponent,
  AdminLayoutComponent
];
const providers = [AppConfirmService];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatIconModule, MatListModule, TranslateModule,
    MatInputModule, MatToolbarModule, MatFormFieldModule, MatMenuModule],
  entryComponents: [AppComfirmComponent],
  providers,
  declarations,
  exports
})
export class SharedModule {}
