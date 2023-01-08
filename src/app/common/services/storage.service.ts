import { Injectable } from '@angular/core';

// models
import { TokensResponse } from '../../pages/auth/models/tokens-response.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storageType: 'localStorage' | 'sessionStorage' = 'localStorage';

  public setStorageType(type: 'localStorage' | 'sessionStorage'): void {
    this.storageType = type;
  }

  public getAccessToken(): string {
    const token = this.STORAGE.getItem('accessToken');
    return token || '';
  }

  public getRefreshToken(): string {
    const token = this.STORAGE.getItem('refreshToken');
    return token || '';
  }

  public setTokens(tokens: TokensResponse): void {
    this.STORAGE.setItem('accessToken', tokens.accessToken);
    this.STORAGE.setItem('refreshToken', tokens.refreshToken);
  }

  private get STORAGE() {
    return this.storageType === 'sessionStorage' ? sessionStorage : localStorage;
  }

  public clear(): void {
    this.STORAGE.clear();
  }
}
