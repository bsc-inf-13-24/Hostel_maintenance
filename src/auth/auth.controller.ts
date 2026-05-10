import {
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { Roles } from './roles.decorator';

import { RolesGuard } from './roles.guard';

import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('setup-admin')
setupAdmin(@Body() createUserDto:  CreateUserDto) {
  return this.authService.setupAdmin(createUserDto);
}

  @Post('create-admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
createAdmin(@Body() body: any) {
  return this.authService.createAdmin(body);
}


  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }
}