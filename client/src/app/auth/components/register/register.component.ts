import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth-service.service';

class CustomValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (
      password === confirmPassword &&
      password !== null &&
      confirmPassword !== null
    ) {
      return null;
    } else {
      return { passwordNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup | any;
  public registered;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) {this.registered = false; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        full_name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: CustomValidators.confirmPassword,
      },
    );
  }

  get getControl(): any {
    return this.registerForm?.controls;
  }

  onSubmit(): any {
    console.log('get registration validity');
    console.log(this.registerForm);
    if (!this.registerForm.invalid) {
      this.authService
        .register(this.registerForm.value)
        .pipe(
          map(user => {
            this.registerForm.reset();
            this.registered = true;
            setTimeout( () => {
              this.registered = false;
              this.router.navigate(['/auth/login']);
            }, 2000);
          })
        )
        .subscribe();
    } else {
      return;
    }
  }
}
