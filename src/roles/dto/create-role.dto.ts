import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { RoleType } from '../../constants/userRoles';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: '' })
  @IsEnum(RoleType, { message: 'value must be either ADMIN or USER' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 150, { message: 'no less 1 no more 150' })
  readonly description: string;
}
