import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-order-dialog',
  templateUrl: './view-order-dialog.component.html',
  styleUrls: ['./view-order-dialog.component.css']
})
export class ViewOrderDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public order: any) { }

  onClose(): void {
    // Логіка для закриття діалогу
  }
}
