import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are required for the route, allow access.
    }
    const { user } = context.switchToHttp().getRequest();
    console.log("guard user", user)
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
