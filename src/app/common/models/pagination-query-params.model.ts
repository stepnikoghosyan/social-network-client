import { QueryParams } from '@common/models/query-params.model';

export interface PaginationQueryParams extends QueryParams {
  showAll?: boolean;
  page?: number;
  pageSize?: number;
}
