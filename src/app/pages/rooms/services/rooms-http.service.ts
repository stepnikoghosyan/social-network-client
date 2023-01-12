import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { BaseHttpService } from '@common/services/base-http.service';

// dto
import { CreateRoomDto } from '../dto/create-room.dto';

// models
import { Room } from '@common/models/room.model';
import { PaginationQueryParams } from '@common/models/pagination-query-params.model';
import { PaginationResponse } from '@common/models/pagination-response.model';

@Injectable({ providedIn: 'root' })
export class RoomsHttpService extends BaseHttpService<Room> {
  private readonly URL = 'rooms';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getRoomsList(queryParams?: PaginationQueryParams): Observable<PaginationResponse<Room>> {
    return this.getByPagination(this.URL, queryParams);
  }

  public createRoom(payload: CreateRoomDto): Observable<void> {
    return this.post(this.URL, payload);
  }
}
