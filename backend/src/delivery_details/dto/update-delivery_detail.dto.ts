import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryDetailDto } from './create-delivery_detail.dto';

export class UpdateDeliveryDetailDto extends PartialType(CreateDeliveryDetailDto) {}
