import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TypeOfQueueService } from './typeOfQueue.service';

@Controller('type-of-queue')
export class TypeOfQueueController {
  constructor(private readonly typeOfQueueService: TypeOfQueueService) {}

  @Get()
  async getTypeOfQueues() {
    return await this.typeOfQueueService.getTypeOfQueues();
  }

  @Get(':id')
  async getTypeOfQueue(@Param('id') id: number) {
    return await this.typeOfQueueService.getTypeOfQueue(id);
  }

  @Post()
  async postTypeOfQueue(@Body() { name }: { name: string }) {
    return await this.typeOfQueueService.postTypeOfQueue(name);
  }

  @Put(':id')
  async updateTypeOfQueue(
    @Param('id') id: number,
    @Body() { name }: { name: string },
  ) {
    return await this.typeOfQueueService.updateTypeOfQueue(id, name);
  }

  @Delete(':id')
  async deleteTypeOfQueue(@Param('id') id: number) {
    return await this.typeOfQueueService.deleteTypeOfQueue(id);
  }
}
