import {RolesEnum} from "@sanmix/ui/@common/roles.enum";
import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
