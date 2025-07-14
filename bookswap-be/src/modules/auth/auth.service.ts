import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../../modules/users/dto/create-users.dto';
import { UserService } from '../../modules/users/user.service';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from '../../config/app-config/app-config.service';

@Injectable()
export class AuthService {
  constructor(
    private userServise: UserService,
    private jwtServise: JwtService,
    private configService: AppConfigService,
  ) {}

  private readonly saltRaunds = parseInt(
    this.configService.get<string>('saltRounds'),
    10,
  );

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRaunds);
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
    return { access_token: token };
  }

  async signIn(email: string, pass: string) {
    const user = await this.userServise.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtServise.signAsync(payload);

    return { access_token: token };
  }
}
