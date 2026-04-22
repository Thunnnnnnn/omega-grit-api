import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateQueueDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  typeOfAnimalId: number;

  @IsOptional()
  @IsNumber()
  typeOfQueueId: number;

  @IsOptional()
  @IsDateString()
  meetTime: string;
}
