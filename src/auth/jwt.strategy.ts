import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';

/**
 * JwtStrategy extends the PassportStrategy provided by NestJS, 
 * utilizing the passport-jwt package to implement a JWT-based authentication strategy.
 * This strategy is responsible for extracting the JWT token from the Authorization header,
 * verifying its validity, and extracting the payload for use in the application.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      // Specifies how the JWT token will be extracted from the request.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Determines whether the expiration field in the JWT should be respected.
      ignoreExpiration: false,
      
      // The secret or public key used to verify the token's signature.
      secretOrKey: 'secretKey',
    });
  }

  /**
   * Performs the validation of the payload extracted from a verified JWT token.
   * 
   * @param payload - The decoded JWT payload.
   * @returns The validation result, which can include any user-related information 
   *          that should be available in the request object for further use in request processing.
   *          This implementation fetches additional user details based on the email in the payload.
   */
  async validate(payload: any) {
    // Example payload extraction. Adjust based on the actual payload structure.
    const user = await this.usersService.findOne(payload.email);
    
    // Returns a subset of the user's information, or any necessary information 
    // from the payload or database for authorization or request handling.
    return { userId: payload.sub, username: payload.username, ...user };
  }
}
