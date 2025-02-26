import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDTO) {
    const payload = {
      name: signUpDto.name,
      lastname: signUpDto.lastname,
      email: signUpDto.email,
      password: signUpDto.password,
    };
    return this.authService.signUp(payload);
  }

  @Post('signin')
  signin(@Body() singInDto: Record<string, any>) {
    return this.authService.signIn(singInDto.email, singInDto.pass);
  }
}
