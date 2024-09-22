import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
})
export class ItemEditDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [this.data.id],
      title: [this.data.title],
      fullTitle: [this.data.fullTitle],
      description: [this.data.description],
      comment: [this.data.comment],
      type: [this.data.type],
      unit: [this.data.unit],
      tax: [this.data.tax],
      price: [this.data.price],
      stockCount: [this.data.stockCount]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const itemData = this.editForm.value;
      
      console.log(itemData); // Перевір, які дані передаються у запиті
  
      this.itemService.updateItem(itemData).subscribe(
        (response) => {
          console.log('Item updated successfully', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating item', error);
        }
      );
    }
  }
  




}
