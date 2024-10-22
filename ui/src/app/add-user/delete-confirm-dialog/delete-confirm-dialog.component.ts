import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this client?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="warn" (click)="onConfirm()">Delete</button>
    </div>
  `,
})
export class DeleteConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
