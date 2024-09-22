import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch clients data from backend
    this.fetchClients();
  }

  fetchClients(): void {
    // Тут буде запит до бекенду для отримання клієнтів
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // Логіка для пошуку
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
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: { message: 'Are you sure you want to delete this client?' },
    // });
  
    // dialogRef.afterClosed().subscribe(confirmed => {
    //   if (confirmed) {
    //     // Логіка для видалення клієнта
    //   }
    // });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(ClientAddDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Логіка для додавання нового клієнта
      }
    });
  }


}
