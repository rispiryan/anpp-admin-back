import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_title: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_title: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_title: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_description: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_description: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_description: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ar_content1: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_content1: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_content1: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ar_content2: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_content2: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_content2: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ar_content3: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly en_content3: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly ru_content3: string;
}
