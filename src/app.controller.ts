import { Controller, Get, Post, UnsupportedMediaTypeException, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post("upload")
  @UseInterceptors(FilesInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.filename)
    return "file keldi"
}



}
