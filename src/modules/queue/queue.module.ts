import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma.module';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [PrismaModule],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
