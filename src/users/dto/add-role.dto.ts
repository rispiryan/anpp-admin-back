import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role value' })
  @IsString({ message: 'must be a string' })
  readonly value: string;

  @ApiProperty({ example: '1234', description: 'user id' })
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: string;
}
