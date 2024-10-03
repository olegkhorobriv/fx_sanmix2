import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = [
    { title: 'Всього продуктів', value: '1500' },
    { title: 'Всього замовлень', value: '320' },
    { title: 'Всього продуктів', value: '120' },
    { title: 'Всього користувачів', value: '1400' }
  ];

  tasks: any[] = [];
  notifications: any[] = [];

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadNotifications();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data
          .filter(task => !task.completed) // Відображаємо лише невиконані завдання
          .map(task => ({
            description: task.text,
            completed: task.completed,
            id: task.id // Додаємо id для подальшого використання
          }));
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data.map(notification => ({
          text: notification.text,
          date: new Date(notification.createdAt)
        }));
      },
      (error) => {
        console.error('Error loading notifications', error);
      }
    );
  }

  toggleTaskCompletion(index: number): void {
    const task = this.tasks[index];
    this.taskService.updateTask(task.id, true).subscribe(
      () => {
        // Фільтруємо виконані завдання з масиву
        this.tasks.splice(index, 1); // Видаляємо виконане завдання з масиву
      },
      (error) => {
        console.error('Error updating task status', error);
      }
    );
  }

  sortNotificationsByDate(): void {
    this.notifications.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
