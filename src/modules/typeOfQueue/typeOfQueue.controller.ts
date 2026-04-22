import { Controller, Get } from '@nestjs/common';
import { TypeOfQueueService } from './typeOfQueue.service';

@Controller('type-of-queue')
export class TypeOfQueueController {
  constructor(private readonly typeOfQueueService: TypeOfQueueService) {}

  @Get()
  async getTypeOfQueues() {
    return await this.typeOfQueueService.getTypeOfQueues();
  }
}
