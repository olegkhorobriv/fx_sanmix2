import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-add-dialog',
  templateUrl: './client-add-dialog.component.html'
})
export class ClientAddDialogComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientAddDialogComponent>,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
    });
  }

  onAdd(): void {
    if (this.addForm.valid) {
      this.clientService.createClient(this.addForm.value).subscribe(
        (result) => {
          this.dialogRef.close(result); // Повертаємо результат, щоб оновити список клієнтів
        },
        (error) => {
          console.error('Error creating client', error); // Логування помилки
        }
      );
    }
  }
}
