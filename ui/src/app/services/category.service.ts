import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Category {
  id: number;
  name: string;
  parentId?: number; // Поле parentId, яке може бути відсутнім для головних категорій
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3333/api/categories';

  constructor(private http: HttpClient) {}

  // Отримання всіх категорій
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  // Додавання нової категорії
  addCategory(category: { name: string; parentId?: number }): Observable<Category> {
    // Встановлюємо parentId в 0, якщо він не визначений
    const categoryData = { 
      name: category.name, 
      parentId: category.parentId ?? 0 
    };
    return this.http.post<Category>(this.baseUrl, categoryData).pipe(catchError(this.handleError));
  }

  // Оновлення категорії
  updateCategory(category: { id: number; name: string; parentId?: number }): Observable<Category> {
    const url = `${this.baseUrl}/${category.id}`;
    // Встановлюємо parentId в 0, якщо він не визначений
    const categoryData = { 
      name: category.name, 
      parentId: category.parentId ?? 0 
    };
    return this.http.put<Category>(url, categoryData).pipe(catchError(this.handleError));
  }

  // Видалення категорії
  deleteCategory(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  // Обробка помилок
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Щось пішло не так; будь ласка, спробуйте ще раз пізніше.');
  }
}
