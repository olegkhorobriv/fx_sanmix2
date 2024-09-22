import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";
import {ROLES_KEY} from "@sanmix/api/app/common/roles.decorator";
import {Observable} from "rxjs";

export class TokenDto {
  id: number;
  role: RolesEnum;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector
  ) {
  }

  canActivate(
      context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = request['token'] as TokenDto;

    return requiredRoles.includes(request?.['token']?.role);
  }
}
