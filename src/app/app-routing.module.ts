import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// models
import { AppRoutes } from '@common/models/app-routes.model';

// utils
import { getFullRoute } from '@common/utils/get-full-route.helper';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Auth,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Auth,
    // canLoad: [NotAuthGuard],
    // canActivate: [NotAuthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    children: [
      {
        path: AppRoutes.Home,
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: AppRoutes.NotFound,
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
  {
    path: '**',
    redirectTo: getFullRoute(AppRoutes.Login),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
