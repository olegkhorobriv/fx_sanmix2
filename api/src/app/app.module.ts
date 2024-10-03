
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from "@sanmix/api/app/common/prisma.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "@sanmix/api/app/common/jwt";
import {FilesModule} from './files/files.module';
import {RolesGuard} from "@sanmix/api/app/common/roles.guard";
import {AuthGuard} from "@sanmix/api/app/common/auth.guard";
import {ItemModule} from "@sanmix/api/app/item/item.module";
import { CategoriesModule } from '../categories/categories.module';
import { ClientModule } from './client/client.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notification/notification.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    PrismaModule,
    ClientModule,
    FilesModule,
    CategoriesModule,
    OrderModule,
    TaskModule,
    NotificationModule,
    ItemModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: {expiresIn: '20000s'},
    }),

  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
    AuthGuard
  ],
})
export class AppModule {
}
