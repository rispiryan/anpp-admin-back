import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test.@gmail.com', description: 'email' })
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'password' })
  readonly password: string;
}
