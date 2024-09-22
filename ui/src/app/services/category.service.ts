import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:3333/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, category)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {
//   public constructor(private http: HttpClient) {}

//   public fetchCategories(): Observable<any> {
//     return this.http.get<any>(`/api/categories`);
//   }

//   public getCategory(id: number): Observable<any> {
//     return this.http.get<any>(`/api/categories/${id}`);
//   }

//   public createCategory(input: any): Observable<any> {
//     return this.http.post<any>(`/api/categories/create`, { input });
//   }

//   public editCategory(input: any): Observable<any> {
//     return this.http.post<any>(`/api/categories/edit`, { input });
//   }

//   public deleteCategory(id: number): Observable<any> {
//     return this.http.delete<any>(`/api/categories/delete/${id}`);
//   }
// }
