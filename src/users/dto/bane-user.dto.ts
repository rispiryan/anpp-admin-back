import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BaneUserDto {
  @ApiProperty({ example: 'bad user', description: 'ban reason' })
  @IsString({ message: 'must be a string' })
  readonly banReason: string;

  @ApiProperty({ example: '1234', description: 'user id' })
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: string;
}
