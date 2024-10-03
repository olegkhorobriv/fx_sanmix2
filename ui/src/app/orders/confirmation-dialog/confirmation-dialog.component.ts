import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Підтвердження</h2>
    <mat-dialog-content>Ви впевнені, що хочете видалити це замовлення?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Відмінити</button>
      <button mat-button (click)="onConfirm()">Видалити</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
