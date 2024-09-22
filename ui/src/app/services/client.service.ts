import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:3333/api/clients'; // URL до твоєї API

  constructor(private http: HttpClient) { }

  // Метод для отримання всіх клієнтів
  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
