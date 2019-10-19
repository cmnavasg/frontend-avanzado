import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {FakeBackendService} from './shared/inmemory-db/inmemory-db.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing';
import {ProfileComponent} from './views/profile/profile.component';
import { ProfileAccountComponent } from './views/profile-account/profile-account.component';
import { ProfileStudyComponent } from './views/profile-study/profile-study.component';
import { ProfileLanguageComponent } from './views/profile-language/profile-language.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(FakeBackendService)
  ],
  declarations: [AppComponent,
  ProfileComponent,
  ProfileAccountComponent,
  ProfileStudyComponent,
  ProfileLanguageComponent,
  DashboardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
