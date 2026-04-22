import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma.module';
import { TypeOfAnimalService } from './typeOfAnimal.service';
import { TypeOfAnimalController } from './typeOfAnimal.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TypeOfAnimalController],
  providers: [TypeOfAnimalService],
  exports: [TypeOfAnimalService],
})
export class TypeOfAnimalModule {}
