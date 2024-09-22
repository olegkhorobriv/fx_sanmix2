import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "@sanmix/ui/auth/auth.component";
import {LogoutComponent} from "@sanmix/ui/auth/logout.component";

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: ':type',
    component: AuthComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
