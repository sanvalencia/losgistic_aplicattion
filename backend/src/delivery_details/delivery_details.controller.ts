import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryDetailsService } from './delivery_details.service';
import { CreateDeliveryDetailDto } from './dto/create-delivery_detail.dto';
import { UpdateDeliveryDetailDto } from './dto/update-delivery_detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('DeliveryDetails')
@Controller('delivery-details')
export class DeliveryDetailsController {
  constructor(private readonly deliveryDetailsService: DeliveryDetailsService) {}

  @Post()
  async create(@Body() createDeliveryDetailDto: CreateDeliveryDetailDto) {
    return this.deliveryDetailsService.create(createDeliveryDetailDto);
  }

  @Get()
  async findAll() {
    return this.deliveryDetailsService.findAll();
  }

  @Get(':remission')
  async findOne(@Param('remission') remission: string) {
    return this.deliveryDetailsService.findOne(remission);
  }

  @Patch(':remission')
  async update(@Param('remission') remission: string, @Body() updateDeliveryDetailDto: UpdateDeliveryDetailDto) {
    return this.deliveryDetailsService.update(remission, updateDeliveryDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.deliveryDetailsService.remove(id);
  }
}
