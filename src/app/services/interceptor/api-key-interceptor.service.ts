import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const {
  apiKey,
  apiHost,
} = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiKeyInterceptorService implements HttpInterceptor {

  constructor() { }

  /**
   * intercept http request and append api key in query param
   * @param req request
   * @param next next handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(apiHost)) {
      const object: any = {
        key: apiKey,
      };

      req.params.keys().forEach(key => {
        object[key] = req.params.get(key);
      });

      return next.handle(req.clone({
        params: new HttpParams({
          fromObject: object,
        }),
      }));
    } else {
      return next.handle(req);
    }
  }
}
