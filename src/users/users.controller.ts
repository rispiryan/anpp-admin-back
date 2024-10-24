import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  // UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // @ApiOperation({ summary: 'User creation' })
  // @ApiResponse({ status: 200, type: User })
  // // @UsePipes(ValidationPipe)
  // @Post()
  // create(@Body() userDto: CreateUserDto) {
  //   return this.userService.createUser(userDto);
  // }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Req() request) {
    const user = request.user;
    return this.userService.profile(user);
  }

  @ApiBody({
    description: 'change password',
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(@Req() request, @Body() passwordDto: { password: string }) {
    const user = request.user;
    return this.userService.changePassword(user, passwordDto);
  }
}
