import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../database/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { QueueModule } from '../queue/queue.module';
import { TypeOfQueueModule } from '../typeOfQueue/typeOfQueue.module';
import { TypeOfAnimalModule } from '../typeOfAnimal/typeOfAnimal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    QueueModule,
    TypeOfQueueModule,
    TypeOfAnimalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
