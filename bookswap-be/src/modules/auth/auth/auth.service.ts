import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/modules/users/dto/create-users.dto';
import { UserService } from 'src/modules/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userServise: UserService,
    private jwtServise: JwtService,
  ) {}

  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async signUp(payload: CreateUserDTO) {
    payload.password = await this.hashPassword(payload.password);
    const user = await this.userServise.create(payload);
    const token = await this.jwtServise.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { user, access_token: token };
  }

  async signIn(email: string, pass: string) {
    const user = await this.userServise.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Користувача не знайдено');
    }

    user.password = await this.hashPassword(user.password);
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Невірний пароль');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtServise.signAsync(payload);

    return { user, access_token: token };
  }
}
