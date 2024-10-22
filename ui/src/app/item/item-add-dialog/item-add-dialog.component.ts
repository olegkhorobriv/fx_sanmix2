import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService, Item } from '../../services/item.service';
import { CategoryService, Category } from '@sanmix/ui/services/category.service';

@Component({
  selector: 'app-item-add-dialog',
  templateUrl: './item-add-dialog.component.html',
  styleUrls: ['./item-add-dialog.component.css']
})
export class ItemAddDialogComponent implements OnInit {
  newItem: Item = {
    id: '',
    code1C: '',
    dealerCode: '',
    vendorId: '',
    title: '',
    fullTitle: '',
    description: '',
    comment: '', 
    type: 'товар', 
    unit: 'шт', 
    tax: 20,
    categoryId: 0,
    price: 0,
    stockCount: 0,
    dealerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: 0,
  };

  categories: Category[] = []; // Список категорій

  constructor(
    public dialogRef: MatDialogRef<ItemAddDialogComponent>,
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Отримуємо категорії при ініціалізації компонента
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addItem(): void {
    this.itemService.addItem(this.newItem).subscribe(() => {
      this.dialogRef.close(true); // Закриваємо діалог, якщо додавання пройшло успішно
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // Закриваємо діалог без додавання
  }
}
