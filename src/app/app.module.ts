import { AppComponent } from './app.component';
import { CoreModule } from './shared/core.module';
import { FakeBackendService } from './shared/inmemory-db/fake-backend.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { rootRouterConfig } from './app-routing';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './shared/state/root.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AuthEffects} from './shared/state/auth';
import {SigninService} from './views/signin/signin.service';
import {ProfileStudentEffects} from './shared/state/user';
import {StudiesEffects} from './shared/state/user/profile-student/studies.effects';
import {LanguagesEffects} from './shared/state/user/profile-student/languages.effects';
import {OffersEffects} from './shared/state/offers/offers.effects';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService, {
      dataEncapsulation: false
    }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([AuthEffects, ProfileStudentEffects, StudiesEffects, LanguagesEffects, OffersEffects])
  ],
  declarations: [AppComponent],
  providers: [SigninService],
  bootstrap: [AppComponent]
})
export class AppModule {}
