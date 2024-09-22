
import { Component, OnInit } from '@angular/core';

interface Order {
  id: number;
  date: string;
  status: string;
  city: string;
  // Інші поля замовлення
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [
    { id: 1, date: '2024-07-01', status: 'completed', city: 'Kyiv' },
    { id: 2, date: '2024-07-02', status: 'pending', city: 'Lviv' },
    // Додаткові замовлення
  ];

  filteredOrders: Order[] = [];
  filterDate: Date | null = null;
  filterStatus: string = '';
  filterCity: string = '';

  ngOnInit(): void {
    this.filteredOrders = this.orders;
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesDate = this.filterDate ? order.date === this.filterDate.toISOString().split('T')[0] : true;
      const matchesStatus = this.filterStatus ? order.status === this.filterStatus : true;
      const matchesCity = this.filterCity ? order.city === this.filterCity : true;
      return matchesDate && matchesStatus && matchesCity;
    });
  }

  clearFilters(): void {
    this.filterDate = null;
    this.filterStatus = '';
    this.filterCity = '';
    this.filteredOrders = this.orders;
  }
}


