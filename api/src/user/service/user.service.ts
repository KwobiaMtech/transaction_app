import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { User } from '../model/user.inteface';
import { AuthService } from '../../auth/service/auth.service';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import {LoginUserDto, UserDto} from '../model/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  createUser(user: User): Observable<User> {
    return this.authService.hash_password(user.password).pipe(
      switchMap((hashed_password: string) => {
        const new_user = new UserEntity();
        new_user.full_name = user.full_name;
        new_user.username = user.username;
        new_user.email = user.email;
        new_user.password = hashed_password;

        return from(this.userRepository.save(new_user)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }

  validateUser(emailOrUsername: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: [{ email: emailOrUsername }, { username: emailOrUsername }],
        select: ['id', 'password', 'full_name', 'email', 'username'],
      }),
    ).pipe(
      switchMap((user: User) =>
        this.authService.compare_passwords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw new HttpException(
                'Invalid Credentials',
                HttpStatus.UNAUTHORIZED,
              );
            }
          }),
        ),
      ),
      catchError((err) => {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  login(user: LoginUserDto): Observable<any> {
    return this.validateUser(user.emailOrUsername, user.password).pipe(
      switchMap((user: User) => {
        console.log('user from validate User');
        console.log(user);
        if (user) {
          return this.authService
            .generate_token(user)
            .pipe(map((token: string) => {
                return {token, ...user}
            }));
        }
        return 'Invalid Credentials';
      }),
    );
  }
}
