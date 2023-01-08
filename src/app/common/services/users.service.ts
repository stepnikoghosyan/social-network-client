import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@common/services/base-http.service';

@Injectable({ providedIn: 'root' })
export class UsersHttpService extends BaseHttpService<any> { // TODO: add user type
  private readonly URL = 'users';

  // TODO: move current user data to separate storage service or add ngrx
  private _currentUser = new BehaviorSubject<any | null>(null);

  public get currentUserData$(): Observable<any | null> {
    return this._currentUser.asObservable();
  }

  public setCurrentUser(value: any) {
    this._currentUser.next(value);
  }

  public clearCurrentUserData(): void {
    this._currentUser.next(null);
  }

  constructor(http: HttpClient) {
    super(http);
  }

  public getCurrentUser(): Observable<any> { // TODO: add user type
    return this.get<any>(`${ this.URL }/my-profile`) // TODO: add user type
      .pipe(
        map(res => normalizeUserResponse(res)),
        tap(response => this.setCurrentUser(response)),
      );
  }
}

function normalizeUserResponse(user: any): any { // TODO: add user type
  return {
    ...user,
    fullName: `${ user.firstName } ${ user.lastName }`,
    profilePictureUrl: user.profilePictureUrl || '/assets/img/avatar-placeholder.png',
  };
}
