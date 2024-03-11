import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  async create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @Get()
  async findAll() {
    return this.billingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.billingService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(id, updateBillingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.billingService.remove(id);
  }
}
