import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { appInitializerInterceptor } from './app-initializer.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const interceptors = [
  appInitializerInterceptor,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
