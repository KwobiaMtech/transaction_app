import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JWT_TOKEN} from '../services/auth-service.service';
import {Store} from '@ngxs/store';
import {LoginToken} from '../store/actions/auth.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.select(state => state.set_token.token).subscribe((jwt_token: string) => {
      console.log('get token from store');
      console.log(jwt_token);
    });
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
