import { AuthService } from './modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './modules/users/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './modules/users/entity/users.entity';
import { AppConfigService } from './config/app-config/app-config.service';
import * as bcrypt from 'bcrypt';
describe('AuthService', () => {
  let authService: AuthService;
  let userServiceMock: jest.Mocked<Partial<UserService>>;
  let jwtServiceMock: jest.Mocked<Partial<JwtService>>;
  let appConfigServiceMock: jest.Mocked<Partial<AppConfigService>>;

  const hashedPassword =
    '$2b$10$bcenGJlGfKWtToBGwnoZFu3zTFceyRRt4667xFvzngo/mm/aTsBAa';

  beforeEach(async () => {
    // 👇 Мокаємо bcrypt.hash перед створенням модуля
    (jest.spyOn(bcrypt, 'hash') as jest.Mock).mockResolvedValue(hashedPassword);

    userServiceMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtServiceMock = {
      signAsync: jest.fn(),
    };

    appConfigServiceMock = {
      get: jest.fn().mockReturnValue('mocked value'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppConfigService, useValue: appConfigServiceMock },
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should sign up a user and return an access token', async () => {
    userServiceMock.create.mockResolvedValue({
      email: 'testEmail@gmail.com',
      password: hashedPassword,
      name: 'testName',
      lastname: 'testName',
      photo: 'defaultPhoto.jpg',
      phone: '1234567890',
      rating: 5,
      desire: 'defaultDesire',
      // Add other required properties with mock values
    } as User);

    jwtServiceMock.signAsync.mockResolvedValue('token');

    const result = await authService.signUp({
      name: 'testName',
      lastname: 'testName',
      email: 'testEmail@gmail.com',
      password: 'test2005',
    });

    expect(result).toEqual({ access_token: 'token' });
    expect(userServiceMock.create).toHaveBeenCalledWith({
      email: 'testEmail@gmail.com',
      password: hashedPassword,
      name: 'testName',
      lastname: 'testName',
    });
  });

  it('should throw UnauthorizedException if user is not found during sign in', async () => {
    userServiceMock.findByEmail.mockResolvedValue(null);

    await expect(
      authService.signIn('test@example.com', 'password'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should sign in a user and return an access token', async () => {
    const user = {
      email: 'test@example.com',
      password: '$2b$10$GMytYMTx9qJauLXlMhCY3Ogk6A6rFzWpRXGtMUQhgZzK9WxD2AYEa', // Хешований пароль
    } as unknown as User;

    userServiceMock.findByEmail.mockResolvedValue(user);
    jwtServiceMock.signAsync.mockResolvedValue('token');

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

    const result = await authService.signIn('test@example.com', 'password');

    expect(result).toEqual({ access_token: 'token' });
  });
});
