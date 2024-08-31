import { ApiProperty } from '@nestjs/swagger';

export class BaneUserDto {
  @ApiProperty({ example: 'bad user', description: 'ban reason' })
  readonly banReason: string;

  @ApiProperty({ example: '1234', description: 'user id' })
  readonly userId: string;
}
