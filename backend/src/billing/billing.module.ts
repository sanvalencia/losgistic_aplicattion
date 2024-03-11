import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { Billing } from './entities/billing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/deliveries/entities/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing,Delivery]), DeliveriesModule],
  controllers: [BillingController],
  providers: [BillingService,],
  exports:[]
})
export class BillingModule {}
