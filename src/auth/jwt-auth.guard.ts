import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard is a custom guard that leverages the Passport JWT strategy
 * for authentication. By extending the built-in AuthGuard from NestJS and
 * specifying 'jwt' as its parameter, this guard enforces authentication using
 * JWT tokens.
 * 
 * When applied to routes or controllers, JwtAuthGuard ensures that incoming
 * requests have a valid JWT token in the Authorization header. It utilizes
 * Passport to validate the token against the secret or public key configured
 * in the application's JWT strategy. If the token is valid, the request is
 * allowed to proceed; otherwise, an unauthorized response is returned.
 * 
 * Usage:
 * @UseGuards(JwtAuthGuard)
 * This decorator can be used at the controller or route handler level to
 * protect endpoints that require authenticated access.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
