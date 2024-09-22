import {NgModule} from "@angular/core";
import {AdminDashboardComponent} from "@sanmix/ui/admin-dashboard/admin-dashboard.component";
import {AdminDashboardRoutingModule} from "@sanmix/ui/admin-dashboard/admin-dashboard-routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AdminDashboardComponent,
  ],
  imports: [
    AdminDashboardRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    CommonModule,

    MatCheckboxModule,
  ],
  providers: [],
})
export class AdminDashboardModule { }
