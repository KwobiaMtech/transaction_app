import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import {AuthService} from '../../../services/auth-service.service';

class MockAuthService {
  logout = () => {};
}

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLayoutComponent ],
      providers: [
          AdminLayoutComponent,
        {
          provide: AuthService, useClass: MockAuthService
        }
      ]
    });

    // const comp = TestBed.inject(AdminLayoutComponent);
    // authService = TestBed.inject(AuthService);
  });


  /*it('should call logout', () => {
      expect(authService.logout.toHaveBeenCalled);
    });*/




  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
