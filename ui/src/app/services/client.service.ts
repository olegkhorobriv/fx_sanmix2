import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:3333/api/clients';

  constructor(private http: HttpClient) {}

  // Метод для отримання всіх клієнтів
  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Метод для створення нового клієнта
  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, clientData);
  }
  updateClient(id: number, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, clientData);
  }
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  // Інші методи для редагування, видалення і перегляду клієнтів
}
