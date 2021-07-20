import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-route.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';






@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class AuthModule { }
