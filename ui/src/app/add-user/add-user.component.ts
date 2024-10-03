import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../services/client.service'; // Додай імпорт сервісу
import { ClientViewDialogComponent } from './client-view-dialog/client-view-dialog.component';
import { ClientEditDialogComponent } from './client-edit-dialog/client-edit-dialog.component';
import { ClientAddDialogComponent } from './client-add-dialog/client-add-dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  clients = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'actions'];

  constructor(private dialog: MatDialog, private clientService: ClientService) {} // Додай сервіс у конструктор

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data; // Заповнюємо масив клієнтів
      },
      (error) => {
        console.error('Error fetching clients', error); // Логування помилки
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.clients = this.clients.filter(client => 
      client.firstName.toLowerCase().includes(filterValue) ||
      client.lastName.toLowerCase().includes(filterValue) ||
      client.phoneNumber.includes(filterValue)
    );
  }

  viewClient(client: any): void {
    this.dialog.open(ClientViewDialogComponent, {
      data: { client },
    });
  }

  editClient(client: any): void {
    const dialogRef = this.dialog.open(ClientEditDialogComponent, {
      data: { client },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Логіка для оновлення клієнта
      }
    });
  }

  confirmDeleteClient(client: any): void {
    // Логіка для видалення клієнта
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(ClientAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchClients(); // Оновлюємо список після додавання нового клієнта
      }
    });
  }
}
