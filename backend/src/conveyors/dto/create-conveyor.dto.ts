import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateConveyorDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bussines_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

}