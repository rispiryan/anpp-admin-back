import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCooperationDto {
  @ApiProperty({ example: 'title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly title: string;

  @ApiProperty({ example: 'http//link.com', description: 'link' })
  @IsString({ message: 'must be a url' })
  readonly link: string;
}
