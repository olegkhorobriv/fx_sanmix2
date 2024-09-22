import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '@sanmix/ui/users/users.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersRoutingModule } from '@sanmix/ui/users/users-routing.module';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { MatTableModule } from '@angular/material/table';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionEyeOutline,
  ionPencilOutline,
  ionTrashBinOutline,
} from '@ng-icons/ionicons';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersFiltersComponent } from './users-filters/users-filters.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersFormComponent,
    UsersFiltersComponent,
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    NgIconsModule,
    NgIconsModule.withIcons({
      ionPencilOutline,
      ionTrashBinOutline,
      ionEyeOutline,
    }),
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
})
export class UsersModule {}
