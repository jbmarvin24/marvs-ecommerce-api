import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Profile } from '../profile/entities/profile.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid email or password.');

    const payload = { sub: user.id, email: user.email };

    return await this.jwtService.signAsync(payload);
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

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    // TODO: Change this array return of exception
    if (!isMatch)
      throw new BadRequestException(['oldPassword does not matched.']);

    if (oldPassword === newPassword)
      throw new BadRequestException([
        'newPassword must not be the same with the Old Password.',
      ]);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userService.changePassword(user.id, hashedPassword);
  }
}
