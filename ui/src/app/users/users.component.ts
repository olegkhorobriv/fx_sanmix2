import {Component, OnInit} from '@angular/core';
import {UsersService} from "@sanmix/ui/users/users.service";
import {UserFilter, UserModel, UserSort} from "../../../../@libs/models/user.model";
import {DEFAULT_PAGE_OPTIONS, DEFAULT_SIZE, Page} from "../../../../@libs/models/common.model";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";
import {UsersFormComponent} from "@sanmix/ui/users/users-form/users-form.component";
import {LoginService} from "@sanmix/ui/auth/login.service";
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: UserModel[] = [];
  filters: UserFilter = {}
  sort: UserSort = {}
  page: Page = {
    size: DEFAULT_SIZE,
    page: 1,
    total: 0
  }

  pageOptions = DEFAULT_PAGE_OPTIONS

  routeQueryParams: Subscription;

  isAdmin = false;

  private unsubscribeSubject = new Subject<void>();

  constructor(
    private service: UsersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private l: LoginService
  ) {
    this.isAdmin = l.uData?.role == RolesEnum.ADMIN

    this.routeQueryParams = route.queryParams
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((params) => {
        if (params['view']) {
          this.openFormDialog(params['view'], false);
        } else if(params['edit']) {
          this.openFormDialog(params['edit'], true);
        }
      });
  }

  ngOnInit() {
  }

  fetch() {
    this.service.fetchUsers(this.filters, this.sort, this.page).subscribe({
      next: data => {
        this.users = data.items;
        this.page.total = data.total
      }
    })
  }

  filter(e: UserFilter) {
    this.filters = e
    this.fetch()
  }

  openFormDialog(id: string, edit: boolean) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      autoFocus: false,
      data: {
        id,
        edit
      },
      height: '70vh',
      width: '40rem'
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(() => {
        this.router.navigate(['.'], { relativeTo: this.route }).then();
        this.fetch()
      });
  }

  create() {
    this.openFormDialog(null, true);
  }
}
