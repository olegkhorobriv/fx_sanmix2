/*
https://docs.nestjs.com/controllers#controllers
*/



import { Controller, Post, UseInterceptors, UploadedFile, Get, Res, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: any) { 
    return { message: 'File uploaded successfully', file };
  }

  @Get()
  getFiles() {
    return this.filesService.getFiles();
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', 'uploads', filename);
    return res.sendFile(filePath);
  }

  @Delete('delete/:filename')
  deleteFile(@Param('filename') filename: string) {
    return this.filesService.deleteFile(filename);
  }
}