import { IsString, IsNumber, IsDateString } from 'class-validator';
export class CreateCommandDto {
  @IsString()
  code: string;
  @IsNumber()
  total: number;
  @IsDateString()
  date: Date;
}
