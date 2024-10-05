import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEventsDto {
  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a strings' })
  @IsOptional()
  readonly ar_title?: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_title?: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_title?: string;

  @ApiProperty({ example: 'ar description', description: 'some description' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ar_description?: string;

  @ApiProperty({ example: 'en description', description: 'some description' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_description?: string;

  @ApiProperty({ example: 'ru description', description: 'some description' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_description?: string;

  @ApiProperty({ example: 'http//link.com', description: 'link' })
  @IsString({ message: 'must be a url' })
  @IsOptional()
  readonly link?: string;
}

export class ParamDTO {
  @IsNotEmpty()
  id: string;
}
