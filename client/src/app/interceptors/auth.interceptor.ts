import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JWT_TOKEN} from '../services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token  = localStorage.getItem(JWT_TOKEN);
    if (token){
      const cloneRequest = request.clone( {
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloneRequest);
    }
    return next.handle(request);
  }
}
