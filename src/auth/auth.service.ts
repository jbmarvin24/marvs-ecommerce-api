import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid email or password.');

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerUserDto: RegisterDto) {
    const newUser = new User(registerUserDto);

    const hash = await bcrypt.hash(registerUserDto.password, 10);
    newUser.password = hash;

    const user = await this.userService.create(
      newUser,
      new Profile(registerUserDto),
    );

    return user;
  }
}
