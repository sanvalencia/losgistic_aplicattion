import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDetailDto } from './dto/create-delivery_detail.dto';
import { UpdateDeliveryDetailDto } from './dto/update-delivery_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { DeliveryDetail } from './entities/delivery_detail.entity';
import { Delivery } from 'src/deliveries/entities/delivery.entity';
import { Status } from 'src/status/entities/status.entity';

@Injectable()
export class DeliveryDetailsService {
  constructor(
    @InjectRepository(DeliveryDetail)
    private deliveries_detailsRepository: Repository<DeliveryDetail>,
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  async create(
    createDeliveryDetailDto: CreateDeliveryDetailDto,): Promise<DeliveryDetail> {
    const delivery: Delivery = await this.deliveriesRepository.findOne({ where: { id: createDeliveryDetailDto.deliveryId },});
    if (!delivery) {
      throw new NotFoundException(
        `Delivery with ID ${createDeliveryDetailDto.deliveryId} not found`,
      );
    }

    const statusId = createDeliveryDetailDto.statusId || 1;
    
    const status: Status = await this.statusRepository.findOne({ where: { id: statusId }});
    if (!status) {
        throw new NotFoundException(
            `Status with ID ${statusId} not found`,
        );
    }

    const newDeliveryDetail = new DeliveryDetail();
    newDeliveryDetail.delivery = delivery;
    newDeliveryDetail.status = status;
    newDeliveryDetail.remission = createDeliveryDetailDto.remission;
    newDeliveryDetail.detail = createDeliveryDetailDto.detail;
    return this.deliveries_detailsRepository.save(newDeliveryDetail);
  }

  async findAll(): Promise<DeliveryDetail[]> {
    return this.deliveries_detailsRepository.find({relations: ['status', 'delivery'],});
  }

  async findOne(remission: string): Promise<DeliveryDetail[]> {
    const deliveryDetails = await this.deliveries_detailsRepository.find({ where: { remission: remission }, relations: ['status', 'delivery'] });
    if (!deliveryDetails || deliveryDetails.length === 0) {
        throw new NotFoundException(`No DeliveryDetail found with remission ${remission}`);
    }
    return deliveryDetails;
  }

  async update(remission: string,updateDeliveryDetailDto: UpdateDeliveryDetailDto,): Promise<DeliveryDetail> {
    const deliveryDetail = await this.deliveries_detailsRepository.findOne({where: { remission: remission },});
    if (!deliveryDetail) {
      throw new NotFoundException(`DeliveryDetail with remission ${remission} not found`);
    }

    const status: Status = await this.statusRepository.findOne({where: { id: updateDeliveryDetailDto.statusId },});
    if (!status) {
      throw new NotFoundException(
        `Status with ID ${updateDeliveryDetailDto.statusId} not found`,
      );
    }

    const newDeliveryDetail = new DeliveryDetail();
    newDeliveryDetail.delivery = deliveryDetail.delivery;
    newDeliveryDetail.status = status;
    newDeliveryDetail.remission = deliveryDetail.remission;
    newDeliveryDetail.detail = deliveryDetail.detail;

    return this.deliveries_detailsRepository.save(newDeliveryDetail);
  }

  async remove(id: number): Promise<void> {const deliveryDetail = await this.deliveries_detailsRepository.findOne({where: { id: id },} as FindOneOptions<DeliveryDetail>);
    if (!deliveryDetail) {
      throw new NotFoundException(`DeliveryDetail with ID ${id} not found`);
    }
    await this.deliveries_detailsRepository.remove(deliveryDetail);
  }
}
