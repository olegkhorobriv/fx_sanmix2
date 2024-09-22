import {Component, Input} from '@angular/core';
import {UserModel} from "../../../../../@libs/models/user.model";
import {LoginService} from "@sanmix/ui/auth/login.service";
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() data: UserModel[] = [];

  displayedColumns = [
    "createdAt", "role", "username", "email", "actions"
  ]

  isAdmin = false

  constructor(
    private l: LoginService
  ) {
    this.isAdmin = l.uData?.role == RolesEnum.ADMIN
  }
}
