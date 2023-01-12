import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@common/services/base-http.service';

// dto
import { ManageFriendshipDto } from '../dto/manage-friendship.dto';

// models
import { Friendship } from '../models/friend.model';
import { PaginationQueryParams } from '@common/models/pagination-query-params.model';
import { PaginationResponse } from '@common/models/pagination-response.model';

// utils
import { normalizeUserResponse } from '../../users/services/users.service';

@Injectable({ providedIn: 'root' })
export class FriendshipHttpService extends BaseHttpService<Friendship> {
  private readonly URL = 'friends';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getPendingFriendRequests(queryParams: PaginationQueryParams): Observable<PaginationResponse<Friendship>> {
    return this.getByPagination<Friendship>(`${this.URL}/pending-friend-requests`, queryParams);
  }

  // TODO: remove user normalizer from here
  public getFriendsList(queryParams: PaginationQueryParams): Observable<PaginationResponse<Friendship>> {
    return this.getByPagination<Friendship>(`${this.URL}/friends-list`, queryParams)
      .pipe(
        map((res) => ({
          count: res.count,
          results: res.results.map((item) => ({
            ...item,
            friend: normalizeUserResponse(item.friend),
            lastActionUser: normalizeUserResponse(item.lastActionUser),
          })),
        })),
      );
  }

  public sendFriendRequest(payload: ManageFriendshipDto): Observable<void> {
    return this.post(`${this.URL}/send-friendship-request`, payload);
  }

  public acceptFriendRequest(requestId: number): Observable<void> {
    return this.put(`${this.URL}/accept-friendship-request/${requestId}`, null);
  }

  public rejectFriendRequest(requestId: number): Observable<void> {
    return this.put(`${this.URL}/reject-friendship-request/:id/${requestId}`, null);
  }

  public deleteFriend(requestId: number): Observable<void> {
    return this.delete(`${this.URL}/:id/${requestId}`);
  }
}
