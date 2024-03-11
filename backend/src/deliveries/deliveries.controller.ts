import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiTags } from '@nestjs/swagger';
import {DeliveryDetailsService } from '../delivery_details/delivery_details.service';

@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService, private readonly deliverisdetailservice: DeliveryDetailsService) {}

  @Post()
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    const delivery = await this.deliveriesService.create(createDeliveryDto);
    const {id} = delivery;
    const {remissions} = createDeliveryDto;
    const createDeliveryDetail = await Promise.all(
      remissions.map(({remission, detail}) =>
        this.deliverisdetailservice.create({
          deliveryId: id,
          remission: remission,
          detail: detail,
          statusId: 1,
        })
      )
    );
    
    return { delivery, createDeliveryDetail };
  }

  @Get()
  async findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id_guia')
  async findOne(@Param('id_guia') id_guia: string) {
    return await this.deliveriesService.findOne(id_guia);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.deliveriesService.remove(id);
  }
}
