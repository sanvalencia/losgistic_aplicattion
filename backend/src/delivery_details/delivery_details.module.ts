import { Module } from '@nestjs/common';
import { DeliveryDetailsService } from './delivery_details.service';
import { DeliveryDetailsController } from './delivery_details.controller';
import { DeliveryDetail } from './entities/delivery_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { StatusModule } from 'src/status/status.module';
import { Status } from 'src/status/entities/status.entity';
import { Delivery } from 'src/deliveries/entities/delivery.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DeliveryDetail, Status, Delivery]),DeliveriesModule,StatusModule],
  controllers: [DeliveryDetailsController],
  providers: [DeliveryDetailsService],
  exports:[DeliveryDetailsService],
})
export class DeliveryDetailsModule {}
