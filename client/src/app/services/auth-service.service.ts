import { Injectable } from '@angular/core';
import {LoginForm} from '../model/login.interface';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.interface';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';


export const JWT_TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl: string;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.apiUrl = environment.api_url;
  }

  register(user: User): any {
    return this.http.post<any>(this.apiUrl + '/api/user/register', user).pipe(
        // tslint:disable-next-line:no-shadowed-variable
      tap((user: User) => console.log(user)),
        // tslint:disable-next-line:no-shadowed-variable
      map((user: User) => user),
    );
  }

  login(login: LoginForm): any {

    return this.http.post<any>(this.apiUrl + '/api/user/login', {emailOrUsername: login.email_username, password: login.password}).pipe(
        tap((jwt) => {
            console.log(jwt);
        }),
        map((jwt) => {
            localStorage.setItem(JWT_TOKEN, jwt.data.token);
        }));

  }

  authenticated(): boolean {
      const token: string | any = localStorage.getItem(JWT_TOKEN);
      return !this.jwtHelper.isTokenExpired(token);
  }

    logout(): void {
        localStorage.removeItem(JWT_TOKEN);
    }
}
