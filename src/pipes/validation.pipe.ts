import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exeptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    console.log(value, 334334);
    const errors = await validate(obj);
    if (errors.length) {
      console.log(errors, 999);
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err?.constraints).join(', ')}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
