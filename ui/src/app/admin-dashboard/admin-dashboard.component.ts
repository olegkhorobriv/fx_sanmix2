import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  stats = [
    { title: 'Всього продуктів', value: '1500' },
    { title: 'Всього замовлень', value: '320' },
    { title: 'Всього продуктів', value: '120' },
    { title: 'Всього користувачів', value: '1400' }
  ];

  tasks = [
    { description: 'Завдання #1', completed: false },
    { description: 'Завдання #2', completed: false },
    { description: 'Завдання #3', completed: false }
  ];

  notifications = [
    { text: 'Сповіщення #1', date: new Date('2024-09-19') },
    { text: 'Сповіщення #2', date: new Date('2024-09-20') },
    { text: 'Сповіщення #3', date: new Date('2024-09-18') }
  ];

  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    if (this.tasks[index].completed) {
      setTimeout(() => {
        this.tasks = this.tasks.filter((_, i) => i !== index);
      }, 500);
    }
  }

  // Функція сортування сповіщень за датою
  sortNotificationsByDate() {
    this.notifications.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
