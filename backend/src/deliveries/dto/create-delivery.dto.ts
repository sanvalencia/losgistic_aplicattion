import { IsNotEmpty, IsString, IsDate, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

class RemissionDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  remission: string;

  @IsNotEmpty()
  @ApiProperty()
  detail: string;
}


export class CreateDeliveryDto {


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  conveyorId: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  id_guia: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  remissions: RemissionDetailDto[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  delivery_date: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  dispatch_date: Date;
}