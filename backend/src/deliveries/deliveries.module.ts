import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { Delivery } from './entities/delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConveyorsModule } from '../conveyors/conveyors.module'
import { Conveyor } from 'src/conveyors/entities/conveyor.entity';
import { DeliveryDetailsService } from 'src/delivery_details/delivery_details.service';
import { DeliveryDetail } from '../delivery_details/entities/delivery_detail.entity'
import { Status } from 'src/status/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery,Conveyor,DeliveryDetail,Status]),ConveyorsModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService,DeliveryDetailsService],
  exports: [TypeOrmModule]
})
export class DeliveriesModule {}
