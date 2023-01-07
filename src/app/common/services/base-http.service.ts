import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// environment
import { environment } from 'src/environments/environment';

// models
import { PaginationResponse } from '@common/models/pagination-response.model';
import { QueryParams } from '@common/models/query-params.model';

// helpers
import { anyToHttpParams } from '@common/utils/any-to-http-params.helper';

export abstract class BaseHttpService<T> {

  protected readonly BASE_API_ENDPOINT: string = environment.BASE_API_ENDPOINT;

  protected constructor(protected readonly http: HttpClient) {
  }

  protected getById<T>(url: string, id: number, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${ this.BASE_API_ENDPOINT }/${ url }/${ id }/`, {
      headers,
    });
  }

  protected getByPagination<T>(url: string, params?: QueryParams): Observable<PaginationResponse<T>> {
    if (!params) {
      params = {
        page: 1,
        pageSize: 10,
      };
    }

    return this.http.get<PaginationResponse<T>>(`${ this.BASE_API_ENDPOINT }/${ url }/`, {
      params: anyToHttpParams(params),
    });
  }

  protected get<T>(url: string, params?: QueryParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${ this.BASE_API_ENDPOINT }/${ url }/`, {
      params: anyToHttpParams(params),
      headers,
    });
  }

  protected getAll<T>(url: string, params?: QueryParams): Observable<PaginationResponse<T>> {
    return this.http.get<PaginationResponse<T>>(`${ this.BASE_API_ENDPOINT }/${ url }/`, {
      params: anyToHttpParams({ ...params, all: true }),
    });
  }

  protected post<PayloadType, ResponseType>(url: string, body: PayloadType | T): Observable<ResponseType> {
    return this.http.post<ResponseType>(`${ this.BASE_API_ENDPOINT }/${ url }/`, body);
  }

  protected put<PayloadType, ResponseType = T>(url: string, body: PayloadType | T): Observable<ResponseType> {
    return this.http.put<ResponseType>(`${ this.BASE_API_ENDPOINT }/${ url }/`, body);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${ this.BASE_API_ENDPOINT }/${ url }/`);
  }

  protected deleteById<T = void>(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${ this.BASE_API_ENDPOINT }/${ url }/${ id }/`);
  }

  protected downloadFile(url: string, fileName: string, actionType: 'download' | 'openInNewTab' = 'download', queryParams?: QueryParams): Observable<void> {
    return this.http.get(`${ this.BASE_API_ENDPOINT }/${ url }/`, {
      responseType: 'blob',
      params: anyToHttpParams(queryParams),
    })
      .pipe(map(response => {
        const file = new Blob([response], { type: response.type });

        const uniqueID = `download-link-unique-id-${ Date.now().toString(36) }`;
        let downloadLink = document.createElement('a');
        downloadLink.id = uniqueID;
        downloadLink.href = window.URL.createObjectURL(file);

        if (actionType === 'download') {
          downloadLink.setAttribute('download', fileName);
        } else {
          downloadLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(downloadLink);
        downloadLink.click();

        window.URL.revokeObjectURL(downloadLink.href);
        const element = document.getElementById(uniqueID);
        if (!!element) {
          element.remove();
        }
      }));
  }
}
