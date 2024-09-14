import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  // UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BaneUserDto } from './dto/bane-user.dto';
import { RoleType } from '../constants/userRoles';
// import { ValidationPipe } from '../pipes/validation.pipe';

@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Give role' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'bane user' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BaneUserDto) {
    return this.userService.ban(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Req() request) {
    const user = request.user;
    return this.userService.profile(user);
  }
}
