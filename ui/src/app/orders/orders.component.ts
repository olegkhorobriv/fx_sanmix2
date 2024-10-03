import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrderDialogComponent } from './create-order-dialog/create-order-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ViewOrderDialogComponent } from './view-order-dialog/view-order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = []; // Додайте цю змінну для зберігання відфільтрованих замовлень
  displayedColumns: string[] = ['id', 'date', 'city', 'status', 'productNames', 'clientName', 'actions'];

  constructor(private orderService: OrderService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Orders component loaded');
    this.loadOrders();
  }

  

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      this.filteredOrders = data; // Ініціалізуйте відфільтровані замовлення
    });
  }

  applyCityFilter(city: string): void {
    this.filteredOrders = this.orders.filter(order => order.city.toLowerCase().includes(city.toLowerCase()));
  }

  applyDateFilter(date: Date): void {
    const formattedDate = date ? new Date(date).toLocaleDateString() : '';
    this.filteredOrders = this.orders.filter(order => {
      return order.orderDate.toLocaleDateString() === formattedDate;
    });
  }

  applyStatusFilter(status: string): void {
    this.filteredOrders = this.orders.filter(order => order.status.toLowerCase().includes(status.toLowerCase()));
  }

  applyClientNameFilter(clientName: string): void {
    this.filteredOrders = this.orders.filter(order => {
      const clientFullName = `${order.Client.firstName} ${order.Client.lastName}`;
      return clientFullName.toLowerCase().includes(clientName.toLowerCase());
    });
  }

  viewOrder(order: any): void {
    const dialogRef = this.dialog.open(ViewOrderDialogComponent, {
      width: '400px',
      data: order // Передайте дані замовлення в діалог
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Логіка після закриття діалогу, якщо потрібно
    });
  }
  

  editOrder(order: any): void {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '400px',
      data: order // Передайте дані замовлення в діалог
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders(); // Перезавантажити замовлення після редагування
      }
    });
  }
  

  deleteOrder(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(id).subscribe(() => {
          this.orders = this.orders.filter((order) => order.id !== id);
          this.filteredOrders = this.filteredOrders.filter((order) => order.id !== id); // Оновіть відфільтровані дані
        });
      }
    });
  }

  openCreateOrderDialog(): void {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }
}
