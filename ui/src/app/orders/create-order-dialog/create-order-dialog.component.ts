import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.css'],
})
export class CreateOrderDialogComponent implements OnInit {
  orderForm: FormGroup;
  clients: any[] = [];
  filteredClients: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      orderDate: ['', Validators.required],
      city: ['', Validators.required],
      status: ['', Validators.required],
      productNames: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    if (this.data) {
      this.populateForm(); // Заповнити форму, якщо є дані замовлення
    }
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data;
      this.filteredClients = data;
    });
  }

  filterClients(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(filterValue)
    );
  }

  populateForm(): void {
    // Заповнення форми даними існуючого замовлення
    this.orderForm.patchValue({
      orderDate: this.data.orderDate,
      city: this.data.city,
      status: this.data.status,
      productNames: this.data.productNames,
      userId: this.data.userId,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateOrUpdate(): void {
    if (this.orderForm.valid) {
      console.log('Order Form Value:', this.orderForm.value); // Лог для дебагінгу
      if (this.data) {
        // Якщо дані є, то це оновлення
        this.orderService.updateOrder(this.data.id, this.orderForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating order:', err),
        });
      } else {
        // Інакше це створення
        this.orderService.createOrder(this.orderForm.value).subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.orderForm.reset(); // Очищення форми після створення
          },
          error: (err) => console.error('Error creating order:', err),
        });
      }
    } else {
      console.warn('Form is invalid:', this.orderForm.errors); // Лог для валідації
    }
  }
  
}
