import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@gmail.com', description: 'email' })
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'Aram Aramyan', description: 'user full name' })
  @IsString({ message: 'must be a string' })
  readonly fullName: string;

  @ApiProperty({ example: '1234', description: 'password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, { message: 'no less 4 no more 16' })
  readonly password: string;
}
