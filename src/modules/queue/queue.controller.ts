import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/createQueue.dto';
import { UpdateQueueDto } from './dto/updateQueue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async getQueues() {
    return await this.queueService.getQueues();
  }

  @Get('user/:userId')
  async getQueuesByUserId(@Param('userId') userId: number) {
    return await this.queueService.getQueuesByUserId(userId);
  }

  @Get('date')
  async getQueuesByDate(@Body('date') date: string) {
    return await this.queueService.getQueuesByDate(new Date(date));
  }

  @Get(':id')
  async getQueue(@Param('id') id: number) {
    return await this.queueService.getQueue(id);
  }

  @Post()
  async postQueue(@Body() data: CreateQueueDto) {
    return await this.queueService.postQueue(data);
  }

  @Put(':id')
  async putQueue(@Param('id') id: number, @Body() data: UpdateQueueDto) {
    return await this.queueService.putQueue(id, data);
  }

  @Delete(':id')
  async deleteQueue(@Param('id') id: number) {
    await this.queueService.deleteQueue(id);
    return {
      message: 'Queue deleted successfully',
    };
  }
}
