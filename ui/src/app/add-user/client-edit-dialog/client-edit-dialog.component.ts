import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-edit-dialog',
  templateUrl: './client-edit-dialog.component.html'
})
export class ClientEditDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: [this.data.client.firstName],
      lastName: [this.data.client.lastName],
      phoneNumber: [this.data.client.phoneNumber],
      email: [this.data.client.email],
      isActive: [this.data.client.isActive],
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.clientService.updateClient(this.data.client.id, this.editForm.value).subscribe({
        next: (updatedClient) => {
          this.dialogRef.close(updatedClient);
        },
        error: (err) => {
          console.error('Error updating client', err);
        },
      });
    }
  }
}
