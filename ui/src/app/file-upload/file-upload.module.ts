import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from './file-upload.component';


@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class FileUploadModule { }
