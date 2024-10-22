import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3333/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createOrder(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateOrder(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
