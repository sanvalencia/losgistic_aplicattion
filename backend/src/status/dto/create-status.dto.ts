import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateStatusDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status_name: string;

  @IsString()
  @ApiProperty()
  description: string;

}