import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TypeOfAnimalService } from './typeOfAnimal.service';

@Controller('type-of-animal')
export class TypeOfAnimalController {
  constructor(private readonly typeOfAnimalService: TypeOfAnimalService) {}

  @Get()
  async getTypeOfAnimals() {
    return await this.typeOfAnimalService.getTypeOfAnimals();
  }

  @Get(':id')
  async getTypeOfAnimal(@Param('id') id: number) {
    return await this.typeOfAnimalService.getTypeOfAnimal(id);
  }

  @Post()
  async postTypeOfAnimal(@Body() { name }: { name: string }) {
    return await this.typeOfAnimalService.postTypeOfAnimal(name);
  }

  @Put(':id')
  async updateTypeOfAnimal(
    @Param('id') id: number,
    @Body() { name }: { name: string },
  ) {
    return await this.typeOfAnimalService.updateTypeOfAnimal(id, name);
  }

  @Delete(':id')
  async deleteTypeOfAnimal(@Param('id') id: number) {
    return await this.typeOfAnimalService.deleteTypeOfAnimal(id);
  }
}
