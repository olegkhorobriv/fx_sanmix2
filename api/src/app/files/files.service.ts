/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  private uploadPath = join(__dirname, '..', 'uploads');

  getFiles() {
    const files = readdirSync(this.uploadPath).map(file => ({
      name: file
    }));
    return files;
  }

  deleteFile(filename: string) {
    const filePath = join(this.uploadPath, filename);
    try {
      unlinkSync(filePath);
      return { message: 'File deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting file' };
    }
  }
}
