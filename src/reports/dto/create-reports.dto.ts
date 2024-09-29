import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportsDto {
  @ApiProperty({ example: 'fileName', description: 'fileName' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly fileName: string;
}
