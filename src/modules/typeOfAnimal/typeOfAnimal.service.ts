import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TypeOfAnimalService {
  constructor(private readonly prisma: PrismaService) {}

  async getTypeOfAnimals() {
    return await this.prisma.typeOfAnimal.findMany();
  }
}
