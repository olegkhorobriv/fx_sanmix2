import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3333/api/item';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }
  
  updateItem(item: Item): Observable<any> {
    return this.http.put(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

export interface Item {
  id: string;
  code1C?: string;
  dealerCode?: string;
  vendorId?: string;
  title: string;
  fullTitle?: string;
  description?: string;
  comment?: string; // Додано
  type?: string; // Додано
  unit?: string; // Додано
  tax?: number; // Змінено на number для відповідності
  categoryId: number;
  price: number;
  stockCount: number;
  dealerId?: string;
  createdAt?: Date; // Додано
  updatedAt?: Date; // Додано
  updatedBy?: number; // Додано
}

