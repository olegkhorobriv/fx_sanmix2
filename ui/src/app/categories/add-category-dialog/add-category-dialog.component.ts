import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  template: `
    <h1 mat-dialog-title>Add Category</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Parent Category</mat-label>
        <mat-select [(ngModel)]="data.parentId">
          <mat-option [value]="0">Main Category</mat-option> <!-- Default to main category -->
          <mat-option *ngFor="let category of categories" [value]="category.id">
            {{ category.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </div>
  `
})
export class AddCategoryDialogComponent implements OnInit {
  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    // Set default value for parentId to 0 (Main Category)
    if (this.data.parentId === undefined) {
      this.data.parentId = 0;
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data); // Pass the data with parentId (0 for main)
  }
}
