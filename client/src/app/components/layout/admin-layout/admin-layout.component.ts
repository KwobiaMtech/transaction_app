import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  public loggedIn: boolean;

  constructor(private authService: AuthService, public router: Router) { this.loggedIn = false; }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
