import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: '' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'password' })
  readonly description: string;
}
