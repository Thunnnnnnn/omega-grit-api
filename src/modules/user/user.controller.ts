import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { Public } from '../common/decorators/public.decorator';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDto> {
    return await this.userService.getUser(id);
  }

  @Post()
  @Public()
  async createUser(@Body() user: CreateUserDto) {
    const res = await this.userService.postUser(user);

    return {
      firstName: res.firstname,
      lastName: res.lastname,
      email: res.email,
    };
  }

  @Put(':id')
  async updateUser(
    @Body() user: Partial<CreateUserDto>,
    @Param('id') id: number,
  ) {
    const res = await this.userService.updateUser(id, user);

    return {
      firstname: res.firstname,
      lastname: res.lastname,
      email: res.email,
      phone: res.phone,
    };
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Body() { password }: { password: string },
  ) {
    await this.userService.deleteUser(id, password);

    return {
      message: 'ลบผู้ใช้เรียบร้อยแล้ว',
    };
  }

  @Post(':id/change-password')
  async changePassword(
    @Param('id') id: number,
    @Body() { currentPassword, newPassword }: ChangePasswordDto,
  ) {
    const res = await this.userService.changePassword(
      id,
      currentPassword,
      newPassword,
    );
    return res;
  }
}
