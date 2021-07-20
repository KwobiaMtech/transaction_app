import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth-service.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {from, Observable, of, throwError} from 'rxjs';
import {HttpEvent} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  loginFailed: any;
  loginSuccess: any;
  loading: boolean;

  constructor(public formBuilder: FormBuilder, public authService: AuthService,   private router: Router) {
    this.loginFailed = false;
    this.loginSuccess = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
          email_username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
          password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  get getControl(): any {
    return this.loginForm?.controls;
  }

  onSubmit(): any {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).pipe(
          map(token => {
            this.loading = false;
            return this.router.navigate(['/admin/transactions']);
          }),
          catchError((error) => {
            this.loading = false;
            this.loginFailed = error.error.message;
            setTimeout(() => {
              this.loginFailed = null;
            }, 2000);
            return throwError(error);
              }
          ),
      ).subscribe();
    }
  }

}
