import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './views/profile/profile.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninComponent} from './views/signin/signin.component';
import {ProfileAccountComponent} from './views/profile-account/profile-account.component';
import {ProfileStudyComponent} from './views/profile-study/profile-study.component';
import {ProfileLanguageComponent} from './views/profile-language/profile-language.component';
import {DashboardComponent} from "./views/dashboard/dashboard.component";
/* import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard'; */

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./views/signin/signin.module').then(m => m.SigninModule),
    data: { title: 'Signin' }
  },
  { path: 'dashboard',
    component: DashboardComponent
  },
  { path: 'profile-student',
    component: ProfileComponent
  },
  {
    path: 'profile-student/account',
    component: ProfileAccountComponent
  },
  {
    path: 'profile-student/study',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-student/study/:uid',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-student/language',
    component: ProfileLanguageComponent
  },
  {
    path: 'profile-student/language/:uid',
    component: ProfileLanguageComponent
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./views/forgot-password/forgot-password.module').then(
        m => m.ForgotPasswordModule
      ),
    data: { title: 'Forgot Password' }
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./views/signup/signup.module').then(m => m.SignupModule),
    data: { title: 'Signup' }
  },
  // Esto está fallando así que lo comento pero tengo que ver por qué falla admin
 /* {
    path: 'admin',
    /*  component: AdminLayoutComponent, */
    /* canActivate: [AuthGuard], */
 /*   children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),

        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        loadChildren: () =>
          import('./views/favorites/favorites.module').then(
            m => m.FavoritesModule
          ),

        data: { title: 'Favorites', breadcrumb: 'FAVORITES' }
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Material', breadcrumb: 'MATERIAL' }
      },

      {
        path: 'offers',
        loadChildren: () =>
          import('./views/offers/offers.module').then(m => m.OffersModule),
        data: { title: 'Offers', breadcrumb: 'Offers' }
      }
    ]
  }, */
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
