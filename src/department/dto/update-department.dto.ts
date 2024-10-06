import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class UpdateDepartmentDto {
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
  @Length(0, 160000, { message: 'no less 4 no more 16' })
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

  @ApiProperty({ example: 'production_department', description: 'some slug' })
  @IsString({ message: 'must be a string' })
  @IsOptional()
  readonly slug: string;

  readonly contentImages1: any;
  readonly contentImages2: any;
  readonly attachedFiles: any;
  readonly deletedFiles: any;
}

export class ParamDTO {
  @IsNotEmpty()
  id: string;
}
