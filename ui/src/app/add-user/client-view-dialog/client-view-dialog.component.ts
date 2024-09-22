import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-view-dialog',
  templateUrl: './client-view-dialog.component.html'
})
export class ClientViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
