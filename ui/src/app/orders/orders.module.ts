import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatTableModule } from '@angular/material/table';
import { CreateOrderDialogComponent } from './create-order-dialog/create-order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewOrderDialogComponent } from './view-order-dialog/view-order-dialog.component';

@NgModule({
  declarations: [
    OrdersComponent,
    CreateOrderDialogComponent,
    ConfirmationDialogComponent,
    ViewOrderDialogComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,

    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
})
export class OrdersModule {}
