import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserFilter} from "../../../../../@libs/models/user.model";
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.css'],
})
export class UsersFiltersComponent implements OnInit{
  @Input() filter: UserFilter = {
    email: "",
    username: "",
    role: []
  }
  @Output() filterRes = new EventEmitter<UserFilter>()

  roles = [
    // {label: RolesEnum.CLIENT, value: RolesEnum.CLIENT}, // todo для клієнтів треба окрема таблиця і сторінка
    {label: RolesEnum.MANAGER, value: RolesEnum.MANAGER},
    {label: RolesEnum.ADMIN, value: RolesEnum.ADMIN}
  ]

  ngOnInit() {
    this.filter.role = this.roles.map(i => i.value);
    this.emit()
  }

  clearFilter() {
    this.filter = {}
    this.emit()
  }

  emit() {
    this.filterRes.emit(this.filter)
  }
}
