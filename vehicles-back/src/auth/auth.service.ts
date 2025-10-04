import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createuserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createuserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({id: user.id})
      };

    } catch(err) {
      this.handleError(err);
    }

  }

  async login(loginUserDto: LoginUserDto) {

    const { password } = loginUserDto;
    let { user } = loginUserDto;

    user = user.toLowerCase().trim();

    const newUser = await this.userRepository.findOne({
      where: [{ username: user }, { email: user }],
      select: { email: true, username: true, password: true, id: true },
    });

    if (!newUser)
      throw new UnauthorizedException('Not valid credentials (user)');
      
    if (!bcrypt.compareSync(password, newUser.password))
      throw new UnauthorizedException('Not valid credentials (password)');

    delete newUser.password;

    return {
      ...newUser,
      token: this.getJwtToken({id: newUser.id})
    };

  }

  checkAuthStatus(payload: JwtPayload) {
    return this.getJwtToken(payload);
  }

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign(payload);
    return token;
  }


  private handleError(error: any): never {
    console.log(error);
    throw new InternalServerErrorException('Please check logs');
  }

}
