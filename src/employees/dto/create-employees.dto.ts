import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeesDto {
  @ApiProperty({ example: 'ar fullName', description: 'some fullName' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_fullName: string;

  @ApiProperty({ example: 'en fullName', description: 'some fullName' })
  @IsString({ message: 'must be a string' })
  readonly en_fullName: string;

  @ApiProperty({ example: 'ru fullName', description: 'some fullName' })
  @IsString({ message: 'must be a string' })
  readonly ru_fullName: string;

  @ApiProperty({ example: 'ar rank', description: 'some rank' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_rank: string;

  @ApiProperty({ example: 'en rank', description: 'some rank' })
  @IsString({ message: 'must be a string' })
  readonly en_rank: string;

  @ApiProperty({ example: 'ru rank', description: 'some rank' })
  @IsString({ message: 'must be a string' })
  readonly ru_rank: string;

  @ApiProperty({ example: 'ar content', description: 'some content' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  readonly ar_content: string;

  @ApiProperty({ example: 'en content', description: 'some content' })
  @IsString({ message: 'must be a string' })
  readonly en_content: string;

  @ApiProperty({ example: 'ru content', description: 'some content' })
  @IsString({ message: 'must be a string' })
  readonly ru_content: string;
}
