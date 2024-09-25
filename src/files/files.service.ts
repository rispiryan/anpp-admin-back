import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuidv4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch {
      throw new HttpException(
        'an error occurred while writing the file',
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
}
