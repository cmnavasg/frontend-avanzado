import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FakeBackendService} from './shared/inmemory-db/fake-backend.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {RouterModule} from '@angular/router';
import { rootRouterConfig } from './app-routing';
import {CoreModule} from './shared/core.module';
import {SharedModule} from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
//        AppRoutingModule,
        BrowserAnimationsModule,
//        LayoutModule,
        OverlayModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        SharedModule,
        CoreModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: false }),
        HttpClientInMemoryWebApiModule.forRoot(FakeBackendService, {
          dataEncapsulation: false
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
