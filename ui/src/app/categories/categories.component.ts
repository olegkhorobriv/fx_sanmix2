import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Failed to load categories', 'Close', { duration: 2000 });
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: { name: '', parentId: 0, categories: this.categories }, // Передаємо список категорій для вибору
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newCategory: Category = {
          id: 0, // ID буде призначений сервером
          name: result.name,
          parentId: result.parentId === null ? 0 : Number(result.parentId), // Встановлюємо 0, якщо немає батьківської категорії
        };

        this.categoryService.addCategory(newCategory).subscribe(
          (addedCategory) => {
            this.categories.push(addedCategory);
            this.filteredCategories.push(addedCategory);
            this.snackBar.open('Category added successfully', 'Close', { duration: 2000 });
          },
          (error) => {
            console.error('Error adding category:', error);
            this.snackBar.open('Failed to add category', 'Close', { duration: 2000 });
          }
        );
      }
    });
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: { ...category, categories: this.categories }, // Передаємо список категорій для вибору
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedCategory: Category = {
          ...category,
          name: result.name,
          parentId: result.parentId === null ? 0 : Number(result.parentId), // Встановлюємо 0, якщо немає батьківської категорії
        };

        this.categoryService.updateCategory(updatedCategory).subscribe(
          () => {
            const index = this.categories.findIndex((cat) => cat.id === updatedCategory.id);
            this.categories[index] = updatedCategory;
            this.filteredCategories = [...this.categories];
            this.snackBar.open('Category updated successfully', 'Close', { duration: 2000 });
          },
          (error) => {
            console.error('Error updating category:', error);
            this.snackBar.open('Failed to update category', 'Close', { duration: 2000 });
          }
        );
      }
    });
  }

  deleteCategory(category: Category): void {
    if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      this.categoryService.deleteCategory(category.id).subscribe(
        () => {
          this.categories = this.categories.filter((cat) => cat.id !== category.id);
          this.filteredCategories = this.categories;
          this.snackBar.open('Category deleted successfully', 'Close', { duration: 2000 });
        },
        (error) => {
          console.error('Error deleting category:', error);
          this.snackBar.open('Failed to delete category', 'Close', { duration: 2000 });
        }
      );
    }
  }
}
