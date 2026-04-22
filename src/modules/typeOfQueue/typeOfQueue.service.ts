import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TypeOfQueueService {
  constructor(private readonly prisma: PrismaService) {}

  async getTypeOfQueues() {
    return await this.prisma.typeOfQueue.findMany();
  }

  async getTypeOfQueue(id: number) {
    return await this.prisma.typeOfQueue.findUnique({
      where: { id },
    });
  }

  async postTypeOfQueue(name: string) {
    return await this.prisma.typeOfQueue.create({
      data: { name },
    });
  }

  async updateTypeOfQueue(id: number, name: string) {
    return await this.prisma.typeOfQueue.update({
      where: { id },
      data: { name },
    });
  }

  async deleteTypeOfQueue(id: number) {
    return await this.prisma.typeOfQueue.delete({
      where: { id },
    });
  }
}
