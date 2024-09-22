import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-add-dialog',
  templateUrl: './client-add-dialog.component.html'
})
export class ClientAddDialogComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientAddDialogComponent>
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
      this.dialogRef.close(this.addForm.value);
    }
  }
}
