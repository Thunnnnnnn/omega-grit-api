import { IsDateString, IsNumber } from 'class-validator';

export class CreateQueueDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  typeOfAnimalId: number;

  @IsNumber()
  typeOfQueueId: number;

  @IsDateString()
  meetTime: string;
}
