import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role value' })
  readonly value: string;

  @ApiProperty({ example: '1234', description: 'user id' })
  readonly userId: string;
}
