import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { ClientViewDialogComponent } from './client-view-dialog/client-view-dialog.component';
import { ClientEditDialogComponent } from './client-edit-dialog/client-edit-dialog.component';
import { ClientAddDialogComponent } from './client-add-dialog/client-add-dialog.component';

@NgModule({
  declarations: [
    AddUserComponent,
    ClientViewDialogComponent,
    ClientEditDialogComponent,
    ClientAddDialogComponent,
  ],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    
  ],
})
export class AddUserModule {}
