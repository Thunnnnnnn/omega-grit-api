import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TypeOfAnimalService {
  constructor(private readonly prisma: PrismaService) {}

  async getTypeOfAnimals() {
    return await this.prisma.typeOfAnimal.findMany();
  }

  async getTypeOfAnimal(id: number) {
    return await this.prisma.typeOfAnimal.findUnique({
      where: { id },
    });
  }

  async postTypeOfAnimal(name: string) {
    return await this.prisma.typeOfAnimal.create({
      data: { name },
    });
  }

  async updateTypeOfAnimal(id: number, name: string) {
    return await this.prisma.typeOfAnimal.update({
      where: { id },
      data: { name },
    });
  }

  async deleteTypeOfAnimal(id: number) {
    return await this.prisma.typeOfAnimal.delete({
      where: { id },
    });
  }
}
