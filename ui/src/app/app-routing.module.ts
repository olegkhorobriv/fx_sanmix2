import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@sanmix/ui/@common/utils/auth.guard";
import {LayoutComponent} from "@sanmix/ui/@layout/layout/layout.component";

// import { UsersComponent } from './users/users.component';
// import { ProductsComponent } from './products/products.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { ReportsComponent } from './reports/reports.component';
// import { SettingsComponent } from './settings/settings.component';
// import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then((m) => m.AdminDashboardModule)
      },
      // { path: 'orders', component: OrdersComponent },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule)
      },

      { path: 'users', loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule)
      },
      
      { path: 'item', loadChildren: () =>
        import('./item/item.module').then(m => m.ItemModule)
      },

      { path: 'add-users', loadChildren: () =>
        import('./add-user/add-user.module').then(m => m.AddUserModule)
      },

      { path: 'categories', loadChildren: () =>
        import('./categories/categories.module').then((m) => m.CategoriesModule)
      },


      // { path: 'reports', component: ReportsComponent },

      { path: 'reports', loadChildren: () =>
        import('./reports/reports.module').then((m) => m.ReportsModule)
      },
      // { path: 'settings', component: SettingsComponent },

      { path: 'settings', loadChildren: () =>
        import('./settings/settings.module').then((m) => m.SettingsModule)
      },
      // { path: 'upload-data', component: FileUploadComponent },
      { path: 'upload-data', loadChildren: () =>
        import('./file-upload/file-upload.module').then((m) => m.FileUploadModule)
      },


       {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  { path: 'add-user', loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule) },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
