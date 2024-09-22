import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from '../services/item.service';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { ItemDetailsDialogComponent } from './item-details-dialog/item-details-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemsComponent implements OnInit {
  items: any[] = [];
  displayedColumns: string[] = ['title', 'price', 'stockCount', 'createdAt', 'category', 'actions'];

  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  viewProduct(item: any): void {
    const dialogRef = this.dialog.open(ItemDetailsDialogComponent, {
      width: '400px',
      data: item
    });
  }


  editProduct(item: any): void {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the list of items after editing
        this.itemService.getItems().subscribe((data) => {
          this.items = data;
        });
      }
    });
  }

  


  

  addProduct() {
    // Логіка для додавання нового товару
  }
}
