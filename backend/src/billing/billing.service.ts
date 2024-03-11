import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { Billing } from './entities/billing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Delivery } from 'src/deliveries/entities/delivery.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing) private billingRepository: Repository<Billing>,
    @InjectRepository(Delivery) private deliveriesRepository: Repository<Delivery>,
  ) {}

  async create(createBillingDto: CreateBillingDto): Promise<Billing> {

    const delivery:Delivery = await this.deliveriesRepository.findOne({where: { id: createBillingDto.deliveryId }})
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${createBillingDto.deliveryId} not found`);
    }

    const newBilling = new Billing()
    newBilling.delivery = delivery
    newBilling.billing_date = createBillingDto.billing_date
    newBilling.customer = createBillingDto.customer
    newBilling.details = createBillingDto.details
    newBilling.price = createBillingDto.price
    return this.billingRepository.save(newBilling);
  }

  async findAll(): Promise<Billing[]> {
    return this.billingRepository.find({ relations: ['delivery'] });
  }

  async findOne(id: number): Promise<Billing> {
    const billing = await this.billingRepository.findOne({where: { id: id }, relations: ['delivery'] } as FindOneOptions<Billing>);
    if (!billing) {
      throw new NotFoundException(`Billing with ID ${id} not found`);
    }
    return billing;
  }

  async update(id: number,updateBillingDto: UpdateBillingDto,): Promise<Billing> {
    const billing = await this.billingRepository.findOne({where: { id: id }} as FindOneOptions<Billing>);
    if (!billing) {
      throw new NotFoundException(`Billing with ID ${id} not found`);
    }

    billing.billing_date = updateBillingDto.billing_date;
    billing.customer = updateBillingDto.customer;
    billing.details = updateBillingDto.details;
    billing.price = updateBillingDto.price;

    await this.billingRepository.save(billing);
    return billing;
  }

  async remove(id: number): Promise<void> {
    const billing = await this.billingRepository.findOne({where: { id: id }} as FindOneOptions<Billing>); 
    if (!billing) {
      throw new NotFoundException(`Billing with ID ${id} not found`);
    }
    await this.billingRepository.remove(billing);
  }
}
