import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/model/user.inteface';
import { from, Observable } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generate_token(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hash_password(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 10));
  }

  compare_passwords(
    password: string,
    hashed_password: string,
  ): Observable<any> {
    return from(bcrypt.compare(password, hashed_password));
  }
}
