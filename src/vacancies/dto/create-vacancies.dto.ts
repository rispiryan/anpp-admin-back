import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVacanciesDto {
  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_title: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_title?: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_title?: string;

  @ApiProperty({ example: 'ar description', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_description: string;

  @ApiProperty({ example: 'en description', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_description?: string;

  @ApiProperty({ example: 'ru description', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_description?: string;

  @ApiProperty({ example: 'http//link.com', description: 'link' })
  @IsString({ message: 'must be a url' })
  readonly link: string;
}
