
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [DatePipe]
})
export class LayoutComponent {
  // Навігаційні елементи з відповідними посиланнями
  navItems = [
    { label: 'Головна', link: '/dashboard' },
    { label: 'Користувачі', link: '/users' },
    { label: 'Додати користувача', link: '/add-users' },
    { label: 'Продукти', link: '/item' },
    { label: 'Категорії', link: '/categories' },
    { label: 'Замовлення', link: '/orders' },
    { label: 'Звіти', link: '/reports' },
    { label: 'Налаштування', link: '/settings' },
    { label: 'Завантажити', link: '/upload-data' }
  ];

  getCurrentDate(): Date {
    return new Date();
  }
}
