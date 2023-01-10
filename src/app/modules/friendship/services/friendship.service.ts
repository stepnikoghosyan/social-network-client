import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// services
import { BaseHttpService } from '@common/services/base-http.service';

// dto
import { ManageFriendshipDto } from '../dto/manage-friendship.dto';

// models
import { Friend } from '../models/friend.model';
import { PaginationQueryParams } from '@common/models/pagination-query-params.model';
import { PaginationResponse } from '@common/models/pagination-response.model';

@Injectable({ providedIn: 'root' })
export class FriendshipHttpService extends BaseHttpService<Friend> {
  private readonly URL = 'friends';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getPendingFriendRequests(queryParams: PaginationQueryParams): Observable<PaginationResponse<Friend>> {
    return this.getByPagination<Friend>(`${this.URL}/pending-friend-requests`, queryParams);
  }

  public getFriendsList(queryParams: PaginationQueryParams): Observable<PaginationResponse<Friend>> {
    return this.getByPagination<Friend>(`${this.URL}/friends-list`, queryParams);
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
