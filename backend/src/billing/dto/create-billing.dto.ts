import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateBillingDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  deliveryId: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  billing_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  customer: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  details: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

}