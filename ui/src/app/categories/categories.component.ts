import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [];
  filteredCategories = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.filteredCategories = data;
    });
  }

  applyFilter(filterValue: string) {
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: { name: '', key: '', parentId: null }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Перетворення значень на числа
        const newCategory = {
          name: result.name,
          key: Number(result.key),  // Перетворення на число
          parentId: result.parentId ? Number(result.parentId) : null  // Перетворення на число, якщо значення є
        };
  
        this.categoryService.addCategory(newCategory).subscribe((newCategory) => {
          this.categories.push(newCategory);
          this.filteredCategories = this.categories; // Оновлення відфільтрованих категорій
          this.snackBar.open('Category added successfully', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }
  

  editCategory(category: any) {
    // Реалізація редагування категорії
  }

  deleteCategory(category: any) {
    // Реалізація видалення категорії
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CategoryService } from '../services/category.service';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css']
// })
// export class CategoriesComponent implements OnInit {
//   categories = [];
//   filteredCategories = [];
//   displayedColumns: string[] = ['name', 'description', 'actions'];

//   constructor(
//     private categoryService: CategoryService,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit() {
//     this.fetchCategories();
//   }

//   fetchCategories() {
//     this.categoryService.fetchCategories().subscribe((data: any[]) => {
//       this.categories = data;
//       this.filteredCategories = data;
//     });
//   }

//   applyFilter(filterValue: string) {
//     this.filteredCategories = this.categories.filter(category =>
//       category.name.toLowerCase().includes(filterValue.toLowerCase())
//     );
//   }

//   addCategory() {
//     const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
//       width: '250px',
//       data: { name: '', key: '', parentId: null }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.categoryService.createCategory(result).subscribe((newCategory) => {
//           this.categories.push(newCategory);
//           this.filteredCategories = this.categories;
//           this.snackBar.open('Category added successfully', 'Close', {
//             duration: 2000,
//           });
//         });
//       }
//     });
//   }

//   editCategory(category: any) {
//     // Реалізація редагування категорії
//   }

//   deleteCategory(category: any) {
//     this.categoryService.deleteCategory(category.id).subscribe(() => {
//       this.categories = this.categories.filter(c => c.id !== category.id);
//       this.filteredCategories = this.categories;
//       this.snackBar.open('Category deleted successfully', 'Close', {
//         duration: 2000,
//       });
//     });
//   }
// }
