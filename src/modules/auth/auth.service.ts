import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/authLogin.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('ไม่พบผู้ใช้งาน');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง');
    }

    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      }),

      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
      },
    };
  }
}
