import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

// services
import { AuthService } from '../pages/auth/services/auth.service';

// models
import { AppRoutes } from '@common/models/app-routes.model';

// utils
import { getFullRoute } from '@common/utils/get-full-route.helper';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanLoad, CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  canLoad(): boolean {
    return this.isNotAuthenticated();
  }

  canActivate(): boolean {
    return this.isNotAuthenticated();
  }

  private isNotAuthenticated(): boolean {
    if (this.authService.isAuthenticated) {
      this.router.navigate([getFullRoute(AppRoutes.Home)]);
      return false;
    }

    return true;
  }
}
