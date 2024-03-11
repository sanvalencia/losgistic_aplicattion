import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Conveyor } from '../conveyors/entities/conveyor.entity';
import { DeliveryDetail } from 'src/delivery_details/entities/delivery_detail.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
    @InjectRepository(Conveyor)
    private conveyorsRepository: Repository<Conveyor>,
    @InjectRepository(DeliveryDetail)
    private deliverydetailsRepository: Repository<Conveyor>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const conveyor: Conveyor = await this.conveyorsRepository.findOne({
      where: { id: createDeliveryDto.conveyorId },
    });

    if (!conveyor) {
      throw new NotFoundException(
        `Conveyor with ID ${createDeliveryDto.conveyorId} not found`,
      );
    }
    const newDelivery = new Delivery();
    newDelivery.conveyor = conveyor;
    newDelivery.id_guia = createDeliveryDto.id_guia;
    newDelivery.delivery_date = createDeliveryDto.delivery_date;
    newDelivery.dispatch_date = createDeliveryDto.dispatch_date;
    return this.deliveriesRepository.save(newDelivery);
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveriesRepository.find({ relations: ['conveyor'] });
  }

  async findOne(id_guia: string) {
    const guia = this.deliveriesRepository
      .createQueryBuilder('delivery')
      .select(['deliveryDetail.remission', 'deliveryDetail.detail', 'deliveryDetail.date','conveyor.bussines_name'])
      .addSelect('delivery.id_guia')
      .addSelect('delivery.reception_date')
      .addSelect('status.status_name')
      .innerJoin('delivery.deliveryDetail', 'deliveryDetail')
      .innerJoin('delivery.conveyor', 'conveyor')
      .innerJoin('deliveryDetail.status', 'status')
      .where('delivery.id_guia = :id_guia', { id_guia: id_guia });
    const query = guia.getQuery();
    const newGuia = await guia.getMany();
    if (!newGuia || newGuia.length === 0) {
      throw new NotFoundException(
        `No DeliveryDetail found with guia ${id_guia}`,
      );
    }
    return newGuia;
  }


  async update(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findOne({
      where: { id: id },
    } as FindOneOptions<Delivery>);
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    delivery.id_guia = updateDeliveryDto.id_guia;
    delivery.delivery_date = updateDeliveryDto.delivery_date;
    delivery.dispatch_date = updateDeliveryDto.dispatch_date;

    await this.deliveriesRepository.save(delivery);
    return delivery;
  }

  async remove(id: number): Promise<void> {
    const delivery = await this.deliveriesRepository.findOne({
      where: { id: id },
    } as FindOneOptions<Delivery>);
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    await this.deliveriesRepository.remove(delivery);
  }
}
