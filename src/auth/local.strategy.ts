import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

/**
 * LocalStrategy extends the PassportStrategy provided by NestJS, 
 * specifically utilizing the passport-local package. This strategy is 
 * tailored for email and password-based authentication.
 * 
 * By overriding the default username field to 'email', this implementation
 * aligns with modern authentication practices where emails are commonly used 
 * as the primary identifier for users.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Configures the strategy to use 'email' as the username field.
  }

  /**
   * Validates a user's email and password during the authentication process.
   * 
   * @param loginUserDto - An object containing the user's login credentials.
   * @returns The authenticated user object or throws an UnauthorizedException
   *          if the credentials are invalid. This ensures that only users with
   *          valid credentials can proceed.
   * 
   * The method delegates user validation to the AuthService, abstracting the
   * details of how users are authenticated and emphasizing the strategy's role
   * in integrating with Passport's authentication flow.
   */
  async validate(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException(); // Throws an exception if no user is found or credentials are invalid.
    }
    return user; // Returns the validated user, making it available in request handling.
  }
}
