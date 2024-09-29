import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReportsDto {
  @ApiProperty({ example: 'fileName', description: 'fileName' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly fileName: string;
}

export class ParamDTO {
  @IsNotEmpty()
  id: string;
}
