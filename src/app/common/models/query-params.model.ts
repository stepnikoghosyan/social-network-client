import { Params } from '@angular/router';

export interface QueryParams extends Params {
  search?: string;
}
