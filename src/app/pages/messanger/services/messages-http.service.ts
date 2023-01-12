import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@common/services/base-http.service';

// dto
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';

// models
import { Message } from '../models/message.model';
import { PaginationQueryParams } from '@common/models/pagination-query-params.model';
import { PaginationResponse } from '@common/models/pagination-response.model';

// utils
import { normalizeUserResponse } from '../../users/services/users.service';

@Injectable({ providedIn: 'root' })
export class MessagesHttpService extends BaseHttpService<Message>{
  private readonly URL = 'messages';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  // TODO: remove normalizer
  public getMessagesList(roomId: number, queryParams?: PaginationQueryParams): Observable<PaginationResponse<Message>> {
    return this.getByPagination<Message>(`${this.URL}/${roomId}`, queryParams)
      .pipe(
        map((res) => ({
          count: res.count,
          results: res.results.map((message) => ({
            ...message,
            author: normalizeUserResponse(message.author),
          }))
        }))
      );
  }

  public createMessage(payload: CreateMessageDto): Observable<void> {
    return this.post(this.URL, payload);
  }

  public updateMessage(roomId: number, payload: UpdateMessageDto): Observable<void> {
    return this.put(`${this.URL}/${roomId}`, payload);
  }

  public deleteMessage(messageId: number): Observable<void> {
    return this.deleteById(this.URL, messageId);
  }
}
