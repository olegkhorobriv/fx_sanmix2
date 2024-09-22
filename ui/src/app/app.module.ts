import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './@layout/layout/layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
// import { OrdersComponent } from './orders/orders.component';
// import { ProductsComponent } from './products/products.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { ReportsComponent } from './reports/reports.component';
// import { SettingsComponent } from './settings/settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// import { UsersComponent } from './users/users.component';
import { OrderFilterPipe } from './order-filter.pipe'; // Додано
import { FormsModule } from '@angular/forms';
// import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdminDashboardModule } from '@sanmix/ui/admin-dashboard/admin-dashboard.module';
import { AuthGuard } from '@sanmix/ui/@common/utils/auth.guard';
import { authInterceptorProviders } from '@sanmix/ui/@common/utils/auth.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OrderFilterPipe, // Додано

  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    AdminDashboardModule,
    MatProgressBarModule,
  ],
  providers: [AuthGuard, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
