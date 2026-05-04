import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {

  @IsNumber()
  studentId!: number;

  @IsString()
  @IsNotEmpty()
  roomNumber!: string;

  @IsString()
  @IsNotEmpty()
  issueType!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}