import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';

import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private jwtService: JwtService,

  ) {}
    async createAdmin(body: any) {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const admin = this.usersRepository.create({
    email: body.email,
    password: hashedPassword,
    role: 'admin',
  });

  return await this.usersRepository.save(admin);
}


  // REGISTER
  async register(createUserDto: CreateUserDto) {

    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

  

    // 👇 make first user admin
    const role =
      createUserDto.email === 'admin@gmail.com'
        ? 'admin'
        : 'student';

    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      role,
    });

    return await this.usersRepository.save(user);
  }

  // LOGIN
  async login(body: any) {

    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}