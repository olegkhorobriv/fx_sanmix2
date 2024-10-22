import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../services/client.service'; // Додай імпорт сервісу
import { ClientViewDialogComponent } from './client-view-dialog/client-view-dialog.component';
import { ClientEditDialogComponent } from './client-edit-dialog/client-edit-dialog.component';
import { ClientAddDialogComponent } from './client-add-dialog/client-add-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  clients = [];
  originalClients = []; // Збережіть оригінальний масив клієнтів
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'actions'];
  filterValue: string = ''; // Змінна для зберігання значення пошуку

  constructor(private dialog: MatDialog, private clientService: ClientService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data; 
        this.originalClients = data; // Збережіть оригінальний масив
      },
      (error) => {
        console.error('Error fetching clients', error); 
      }
    );
  }

  applyFilter(): void {
    this.clients = this.originalClients.filter(client => 
      client.firstName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      client.lastName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      client.phoneNumber.includes(this.filterValue)
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
        this.clientService.updateClient(client.id, result).subscribe(
          () => {
            this.fetchClients(); // Оновлюємо список клієнтів після редагування
          },
          (error) => {
            console.error('Error updating client', error); // Логування помилки
          }
        );
      }
    });
  }
  
  confirmDeleteClient(client: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(
          () => {
            this.fetchClients(); // Оновлюємо список клієнтів після видалення
          },
          (error) => {
            console.error('Error deleting client', error); // Логування помилки
          }
        );
      }
    });
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
