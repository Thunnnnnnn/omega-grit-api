import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQueueDto } from './dto/createQueue.dto';
import { UpdateQueueDto } from './dto/updateQueue.dto';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import dayjs = require('dayjs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const utc = require('dayjs/plugin/utc');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const timezone = require('dayjs/plugin/timezone');

import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class QueueService {
  constructor(private readonly prisma: PrismaService) {}

  async getQueues() {
    return await this.prisma.queue.findMany();
  }

  async getQueue(id: number) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
          },
        },
        typeOfQueue: true,
        typeOfAnimal: true,
      },
    });

    if (!queue) {
      throw new BadRequestException('ไม่พบคิว');
    }

    return queue;
  }

  async postQueue(data: CreateQueueDto) {
    const runningNumber = await this.prisma.runningNumber.findFirst({
      where: {
        typeOfQueueId: data.typeOfQueueId,
      },
    });

    if (!runningNumber) {
      await this.prisma.runningNumber.create({
        data: {
          typeOfQueueId: data.typeOfQueueId,
          number: 1,
        },
      });
    } else {
      await this.prisma.runningNumber.update({
        where: {
          id: runningNumber.id,
        },
        data: {
          number: runningNumber.number + 1,
        },
      });
    }

    const isQueueExist = await this.prisma.queue.findFirst({
      where: {
        meetTime: data.meetTime,
      },
    });

    if (isQueueExist) {
      throw new BadRequestException(
        'มีคิวในวัน-เวลานี้แล้ว กรุณาเลือกวัน-เวลาอื่น',
      );
    }

    const res = await this.prisma.queue.create({
      data: {
        ...data,
        name:
          data.typeOfQueueId.toString() +
          '-' +
          (runningNumber
            ? (runningNumber.number + 1).toString().padStart(3, '0')
            : '001'),
      },
    });

    return res;
  }

  async putQueue(id: number, data: UpdateQueueDto) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: Number(id) },
    });

    if (!queue) {
      throw new BadRequestException('ไม่พบคิว');
    }

    const isQueueExist = await this.prisma.queue.findFirst({
      where: {
        meetTime: data.meetTime,
      },
    });

    if (isQueueExist) {
      throw new BadRequestException(
        'มีคิวในวัน-เวลานี้แล้ว กรุณาเลือกวัน-เวลาอื่น',
      );
    }

    const res = await this.prisma.queue.update({
      where: { id: Number(id) },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
          },
        },
        typeOfQueue: true,
        typeOfAnimal: true,
      },
    });

    return res;
  }

  async deleteQueue(id: number) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: Number(id) },
    });

    if (!queue) {
      throw new BadRequestException('ไม่พบคิว');
    }

    await this.prisma.queue.delete({
      where: { id: Number(id) },
    });
  }

  async getQueuesByUserId(userId: number) {
    const queues = await this.prisma.queue.findMany({
      where: { userId: Number(userId) },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
          },
        },
        typeOfQueue: true,
        typeOfAnimal: true,
      },
      orderBy: {
        meetTime: 'desc',
      },
    });

    return queues;
  }

  async getQueuesByDate(date: Date) {
    const start = dayjs(date).tz('Asia/Bangkok').startOf('day').utc().toDate();
    const end = dayjs(date).tz('Asia/Bangkok').endOf('day').utc().toDate();
    const queues = await this.prisma.queue.findMany({
      where: {
        meetTime: {
          gte: start,
          lte: end,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
          },
        },
        typeOfQueue: true,
        typeOfAnimal: true,
      },
    });

    if (!queues.length) {
      throw new BadRequestException('ไม่พบคิวในวันที่เลือก');
    }

    return queues;
  }
}
