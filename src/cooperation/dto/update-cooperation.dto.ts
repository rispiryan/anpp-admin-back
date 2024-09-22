import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCooperationDto {
  @ApiProperty({ example: 'title', description: 'some title' })
  @IsString({ message: 'must be a string' })
  readonly title: string;

  @ApiProperty({ example: 'http//link.com', description: 'link' })
  @IsString({ message: 'must be a url' })
  readonly link: string;
}

export class ParamDTO {
  @IsNotEmpty()
  id: string;
}