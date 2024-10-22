import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService, Item } from '../services/item.service';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { ItemDetailsDialogComponent } from './item-details-dialog/item-details-dialog.component';
import { ItemAddDialogComponent } from './item-add-dialog/item-add-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = ['title', 'price', 'stockCount', 'createdAt', 'category', 'actions'];

  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  viewProduct(item: Item): void {
    const dialogRef = this.dialog.open(ItemDetailsDialogComponent, {
      width: '400px',
      data: item
    });
  }

  editProduct(item: Item): void {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadItems(); // Оновлюємо список товарів після редагування
      }
    });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ItemAddDialogComponent, {
      width: '400px',
      data: null // Передаємо null, щоб діалог знав, що ми додаємо новий товар
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadItems(); // Оновлюємо список товарів після додавання
      }
    });
  }

  deleteProduct(item: Item): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.itemService.deleteItem(item.id).subscribe(() => {
        this.loadItems(); // Оновлюємо список товарів після видалення
      });
    }
  }
}
