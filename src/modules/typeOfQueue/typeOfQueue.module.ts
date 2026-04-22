import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma.module';
import { TypeOfQueueService } from './typeOfQueue.service';
import { TypeOfQueueController } from './typeOfQueue.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TypeOfQueueController],
  providers: [TypeOfQueueService],
  exports: [TypeOfQueueService],
})
export class TypeOfQueueModule {}
