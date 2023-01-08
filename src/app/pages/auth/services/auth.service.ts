import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';

// services
import { BaseHttpService } from '@common/services/base-http.service';
import { StorageService } from '@common/services/storage.service';
import { UsersHttpService } from '@common/services/users.service';

// dto
// import { ResetPasswordDto } from '../models/dto/reset-password.dto';
// import { ForgotPasswordDto } from '../models/dto/forgot-password.dto';
import { LoginDto } from '../models/dto/login.dto';
import { RegisterDto } from '../models/dto/register.dto';
// import { ResendActivationTokenDto } from '../models/dto/resend-activation-token.dto';

// models
import { TokensResponse } from '../models/tokens-response.model';
import { IRefreshTokensPayload } from '../models/payload/refresh-tokens-payload.model';
import { AppRoutes } from '@common/models/app-routes.model';

// utils
import { getFullRoute } from '@common/utils/get-full-route.helper';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService<any> {
  private readonly URL = 'auth';

  constructor(
    private readonly usersHttpService: UsersHttpService,
    // private readonly appStateService: AppStateService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    http: HttpClient,
  ) {
    super(http);
  }

  public login(payload: LoginDto, rememberMe = true): Observable<any> { // TODO: change response type
    if (rememberMe) {
      this.storageService.setStorageType('localStorage');
    } else {
      this.storageService.setStorageType('sessionStorage');
    }

    return this.post<LoginDto, TokensResponse>(`${ this.URL }/login`, payload)
      .pipe(
        tap((res) => this.storageService.setTokens(res)),
        switchMap(() => this.usersHttpService.getCurrentUser()),
      );
  }

  public register(payload: RegisterDto): Observable<void> {
    return this.post<RegisterDto, void>(`${ this.URL }/register`, payload);
  }

  public refreshTokens(refreshToken: string): Observable<TokensResponse> {
    return this.post<IRefreshTokensPayload, TokensResponse>(`${ this.URL }/refresh-tokens`, { refreshToken } as IRefreshTokensPayload);
  }

  // public forgotPassword(payload: ForgotPasswordDto): Observable<void> {
  //   return this.post<ForgotPasswordDto, void>(`${ this.URL }/forgot-password`, payload);
  // }

  // public resetPassword(payload: ResetPasswordDto): Observable<void> {
  //   return this.post<ResetPasswordDto, void>(`${ this.URL }/reset-password`, payload);
  // }

  // public verifyAccount(activationToken: string): Observable<void> {
  //   return this.get(`${ this.URL }/verify-account`, { activationToken } as VerifyAccountQueryParams);
  // }

  // public resendActivationToken(data: ResendActivationTokenDto): Observable<void> {
  //   return this.post<ResendActivationTokenDto, void>(`${ this.URL }/resend-activation-token`, data);
  // }

  public get isAuthenticated(): boolean {
    return !!this.storageService.getAccessToken();
  }

  public logout(): void {
    // this.storageService.clear();
    // this.appStateService.clear();
    this.router.navigate([getFullRoute(AppRoutes.Login)]);
  }
}
