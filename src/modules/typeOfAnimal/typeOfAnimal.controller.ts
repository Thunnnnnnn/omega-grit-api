import { Controller, Get } from '@nestjs/common';
import { TypeOfAnimalService } from './typeOfAnimal.service';

@Controller('type-of-animal')
export class TypeOfAnimalController {
  constructor(private readonly typeOfAnimalService: TypeOfAnimalService) {}

  @Get()
  async getTypeOfAnimals() {
    return await this.typeOfAnimalService.getTypeOfAnimals();
  }
}
