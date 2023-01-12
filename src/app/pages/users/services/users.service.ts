import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@common/services/base-http.service';

// models
import { User } from '../models/user.model';
import { PaginationResponse } from '@common/models/pagination-response.model';
import { UsersQueryParams } from '../models/users-query-params.model';

@Injectable({ providedIn: 'root' })
export class UsersHttpService extends BaseHttpService<User> {
  private readonly URL = 'users';

  // TODO: move current user data to separate storage service or add ngrx
  private _currentUser = new BehaviorSubject<User | null>(null);

  public get currentUserData$(): Observable<User | null> {
    return this._currentUser.asObservable();
  }

  public get currentUserData(): User | null {
    return this._currentUser.value;
  }

  public setCurrentUser(value: User) {
    this._currentUser.next(value);
  }

  public clearCurrentUserData(): void {
    this._currentUser.next(null);
  }

  constructor(http: HttpClient) {
    super(http);
  }

  public getCurrentUser(): Observable<User> {
    return this.get<User>(`${ this.URL }/my-profile`)
      .pipe(
        map(res => normalizeUserResponse(res)),
        tap(response => this.setCurrentUser(response)),
      );
  }

  public getUsersList(queryParams?: UsersQueryParams): Observable<PaginationResponse<User>> {
    return this.getByPagination<User>(`${this.URL}`, queryParams)
      .pipe(
        map((res) => ({
          count: res.count,
          results: res.results.map((item) => normalizeUserResponse(item)),
        })),
        // map((res) => {
        //   res.results[1].profilePictureUrl = 'https://placekitten.com/200/287';
        //   return res;
        // }),
      );
  }
}

export function normalizeUserResponse(user: User): User {
  return {
    ...user,
    fullName: `${ user.firstName } ${ user.lastName }`,
    profilePictureUrl: user.profilePictureUrl || '/assets/img/avatar-placeholder.png',
  };
}
