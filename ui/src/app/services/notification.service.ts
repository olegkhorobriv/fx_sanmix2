import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:3333/api/notifications';

  constructor(private http: HttpClient) {}

  createNotification(notification: { text: string }): Observable<any> {
    return this.http.post(this.baseUrl, notification);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
