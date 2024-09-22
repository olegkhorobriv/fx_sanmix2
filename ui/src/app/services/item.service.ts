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

 updateItem(item: Item): Observable<any> {
  return this.http.put(`${this.apiUrl}/${item.id}`, item);
}
}

export interface Item {
  id: string;
  code1C?: string;
  dealerCode?: string;
  title: string;
  fullTitle?: string;
  description?: string;
  price: number;
  stockCount: number;
  categoryId: number;
  vendorId?: string;
}
