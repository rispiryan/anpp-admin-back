import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateNewsDto {
  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ar_title: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_title: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_title: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ar_description: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_description: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_description: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ar_content1: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_content1: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_content1: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ar_content2: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_content2: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_content2: string;

  @ApiProperty({ example: 'ar title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ar_content3: string;

  @ApiProperty({ example: 'en title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly en_content3: string;

  @ApiProperty({ example: 'ru title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly ru_content3: string;

  readonly image: any;
  readonly contentImages1: any;
  readonly contentImages2: any;
  readonly deletedFiles: any;
}

export class ParamDTO {
  @IsNotEmpty()
  id: string;
}
