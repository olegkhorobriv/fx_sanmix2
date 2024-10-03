import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3333/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: { text: string; dueDate: Date }): Observable<any> {
    return this.http.post(this.baseUrl, task);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateTask(id: number, completed: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, { completed });
  }
}
