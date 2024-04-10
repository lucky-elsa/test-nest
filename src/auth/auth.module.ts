import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule, // Integrates the Users module, assuming it handles user management functionalities.
    PassportModule, // Imports PassportModule for authentication middleware.
    JwtModule.register({ // Configures the JWT module with a secret key and token expiration.
      secret: 'secretKey', // The secret key for signing JWTs. In production, use a more secure way to manage this key.
      signOptions: { expiresIn: '3600s' }, // Sets the expiration time for tokens to 1 hour.
    }),
  ],
  providers: [
    AuthService, // Registers the AuthService to be available for dependency injection across the application.
    JwtStrategy, // Registers the JwtStrategy, which handles JWT authentication logic.
    LocalStrategy, // Registers the LocalStrategy, typically used for username and password authentication.
  ],
  controllers: [AuthController], // Makes the AuthController, which defines authentication-related endpoints, available.
  exports: [AuthService, JwtStrategy] // Exports AuthService and JwtStrategy so they can be reused in other modules.
})
export class AuthModule {}
