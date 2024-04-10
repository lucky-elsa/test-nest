import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * LocalAuthGuard is a custom guard that leverages Passport's local strategy
 * for authentication. This strategy is commonly used for authenticating users
 * with a username and password. By extending the generic AuthGuard and specifying
 * 'local' as its parameter, this guard enforces that the local strategy be used
 * for authentication in the routes or controllers it's applied to.
 * 
 * The local strategy must be defined elsewhere in the application, where it will
 * typically involve validating a user's credentials against a database. Once a user
 * is authenticated, their user information is attached to the request object, allowing
 * for user-specific handling in protected routes.
 * 
 * Usage:
 * @UseGuards(LocalAuthGuard)
 * This decorator can be applied at the controller or route handler level to protect
 * endpoints that require user authentication via username and password.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
