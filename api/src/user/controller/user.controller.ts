import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.inteface';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginUserDto, UserDto } from '../model/user.dto';
import Any = jasmine.Any;

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  create(@Body() user: UserDto): Observable<User | Object> {
    return this.userService.createUser(user).pipe(
      map((user: User) => user),
      catchError((error) =>
        of({
          error: error.message,
        }),
      ),
    );
  }

  @Post('login')
  login(@Body() user: LoginUserDto): Observable<Object> {
    return this.userService.login(user).pipe(
      map((token: Object) => {
        return { data: token };
      }),
    );
  }
}
