import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserDto[]> {
    const user = await this.prisma.user.findMany();

    return user.map((user) => ({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
    }));
  }

  async getUser(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new BadRequestException('ไม่พบผู้ใช้');
    }

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
    };
  }

  async postUser(user: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('อีเมลนี้มีอยู่แล้ว');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const res = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return res;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!existingUser) {
        throw new BadRequestException('ไม่พบผู้ใช้');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: Number(id) },
        data: user,
      });

      return {
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        phone: updatedUser.phone,
      };
    } catch (error: any) {
      if (error.code === 'P2002') {
        // 👈 unique constraint
        throw new BadRequestException('อีเมลนี้มีอยู่แล้ว');
      }
      throw error;
    }
  }

  async deleteUser(id: number, password: string): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      throw new BadRequestException('ไม่พบผู้ใช้');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('รหัสผ่านไม่ถูกต้อง');
    }

    await this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      throw new BadRequestException('ไม่พบผู้ใช้');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('รหัสผ่านปัจจุบันไม่ถูกต้อง');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: Number(id) },
      data: { password: hashedNewPassword },
    });

    return {
      message: 'เปลี่ยนรหัสผ่านสำเร็จ',
    };
  }
}
