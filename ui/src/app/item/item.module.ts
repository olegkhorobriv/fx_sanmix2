import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Components
import { ItemsComponent } from './item.component';
import { ItemRoutingModule } from './item-routing.module';

// Services
import { ItemService } from '../services/item.service';
import { ItemDetailsDialogComponent } from './item-details-dialog/item-details-dialog.component';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { ItemAddDialogComponent } from './item-add-dialog/item-add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemDetailsDialogComponent,
    ItemEditDialogComponent,
    ItemAddDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ItemRoutingModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  providers: [
    ItemService, // Сервіс для взаємодії з бекендом
  ],
  entryComponents: [ItemDetailsDialogComponent, ItemEditDialogComponent],
})
export class ItemModule {}
