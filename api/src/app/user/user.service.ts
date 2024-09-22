import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "@sanmix/api/app/common/prisma.service";
import {LoginModel} from "../../../../@libs/models/login.model";
import {RegisterModel} from "../../../../@libs/models/register.model";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";
import { UserFilter, UserModel, UserSort} from "../../../../@libs/models/user.model";
import {Page} from "../../../../@libs/models/common.model";

@Injectable() 
export class UserService {

  private readonly salt = 3;

  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService
  ) {
  }

  public async login(data: LoginModel) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email
      }
    })
    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
        const payload = {id: user.id, username: user.username, email: user.email, role: user.role};
        const access_token = await this.jwtService.signAsync(payload);

        // if (access_token) {
        //   const valid_to = new Date();
        //   valid_to.setMinutes(valid_to.getMinutes() + 15)
        //   await this.prisma.accessTokens.create({
        //     data: {
        //       token: access_token,
        //       user_id: user.id,
        //       valid_to
        //     }
        //   })
        // }

        return {
          access_token
        };
      } else {
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
  }

  public async register(data: RegisterModel, role?: RolesEnum) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {email: data.email},
          {username: data.username},
        ]
      }
    })

    if (user) return false;

    const hash = await bcrypt.hash(data.password, this.salt);

    const setRole = role ? role : RolesEnum.CLIENT

    return await this.prisma.user.create({
      data: {
        email: data.email,
        role: setRole,
        password: hash,
        username: data.username,
        createdAt: new Date()
      }
    })
  }

  public async fetchUsers(filter: UserFilter, sort: UserSort, page: Page) {
    return {
      items: await this.prisma.user.findMany({
        where: {
          role: {
            in: filter.role
          },
          email: {
            contains: filter.email
          },
          username: {
            contains: filter.username
          }
        },
        orderBy: {
          id: sort.id,
          role: sort.role,
          createdAt: sort.createdAt
        },
        take: page.size,
        skip: (page.page - 1) * page.size
      }),
      total: await this.prisma.user.count({
        where: {
          role: {
            in: filter.role
          },
          email: {
            contains: filter.email
          },
          username: {
            contains: filter.username
          }
        }
      })
    }
  }

  public async getUser(id: string) {
    return await this.prisma.user.findFirst({
      select: {
        id: true,
        role: true,
        username: true,
        email: true,
        createdAt: true,
      },
      where: {
        id: parseInt(id, 10)
      }
    })
  }

  public async editUser(data: UserModel) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: data.id
      }
    })

    if (!user) {
      return null
    }

    let newPwd: string = undefined;
    if (data.password) {
      newPwd = await bcrypt.hash(data.password, this.salt);
    }

    return await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        role: data.role,
        username: data.username,
        email: data.email,
        password: newPwd
      }
    })
  }
}
