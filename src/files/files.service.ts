import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileExtension = this.getFileExtension(file.mimetype);
      const fileName =
        file.originalname + '@' + file.size + '@' + uuidv4() + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch {
      throw new HttpException(
        'An error occurred while writing the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException(
        'An error occurred while deleting the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getFileExtension(mimetype: string): string {
    switch (mimetype) {
      case 'image/jpeg':
        return '.jpg';
      case 'image/png':
        return '.jpg';
      case 'application/pdf':
        return '.pdf';
      default:
        throw new HttpException(
          'Unsupported file type',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  async downloadFile(fileName: string, res: any): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      if (fs.existsSync(filePath)) {
        res.download(filePath, fileName, (err) => {
          if (err) {
            throw new HttpException(
              'An error occurred while downloading the file',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        });
      } else {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException(
        'An error occurred while downloading the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
