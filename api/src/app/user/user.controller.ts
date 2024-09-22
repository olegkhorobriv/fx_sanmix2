import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { UserService } from '@sanmix/api/app/user/user.service';
import { LoginModel } from '../../../../@libs/models/login.model';
import { RegisterModel } from '../../../../@libs/models/register.model';
import {UserCreateModel, UserFilter, UserModel, UserSort} from "../../../../@libs/models/user.model";
import {Page} from "../../../../@libs/models/common.model";
import {Roles} from "@sanmix/api/app/common/roles.decorator";
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";
import {AuthGuard} from "@sanmix/api/app/common/auth.guard";
import {RolesGuard} from "@sanmix/api/app/common/roles.guard";

@Controller('user')
export class UserController {

  constructor(
      private userService: UserService
  ) {
  }

  @Post('login')
  public async login(
      @Body('data') data: LoginModel
  ) {
    return await this.userService.login(data);
  }

  @Post('register')
  public async register(
      @Body('data') data: RegisterModel
  ) {
    return await this.userService.register(data);
  }

  @Post('users')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  public async users(
      @Body('filter') filter: UserFilter,
      @Body('sort') sort: UserSort,
      @Body('page') page: Page,
  ) {
    return await this.userService.fetchUsers(filter, sort, page);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  public async user(
      @Param('id') id: string
  ) {
    return await this.userService.getUser(id);
  }

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  public async userCreate(
      @Body('input') input: UserCreateModel
  ) {
    return await this.userService.register(input, input?.role);
  }

  @Post('edit')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  public async userEdit(
      @Body('input') input: UserModel
  ) {
    return await this.userService.editUser(input);
  }
}
