import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {AuthLayoutComponent} from './components/layout/auth-layout/auth-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {NgxsModule} from '@ngxs/store';
import {TransactionState} from './store/state/transaction.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
      NgxsModule.forRoot([
          TransactionState,
      ]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
