import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common';

/**
 * AuthController handles authentication-related routes,
 * providing endpoints for user registration and login.
 */

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Registers a new user in the system.
   * 
   * @param createUserDto DTO containing the user's registration information.
   * @returns The result of the registration process, typically the user's profile or a success message.
   */

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * Authenticates a user based on provided credentials.
   * 
   * @param loginUserDto DTO containing the user's login credentials.
   * @returns A token for authenticated access upon successful login or throws an UnauthorizedException
   *          if the credentials are invalid.
   */

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(loginUserDto);
  }
}
