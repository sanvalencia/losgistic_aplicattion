import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateDeliveryDetailDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  deliveryId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  remission: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  statusId: number;

}