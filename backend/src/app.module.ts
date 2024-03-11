import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ConveyorsModule } from './conveyors/conveyors.module';
import { DeliveryDetailsModule } from './delivery_details/delivery_details.module';
import { StatusModule } from './status/status.module';
import { BillingModule } from './billing/billing.module';
import { SeedStatusService } from './seed/seed-status.service';
import { SeedConveryorService } from './seed/seed-conveyors.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root_user',
      password: 'root',
      database: 'logistica',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DeliveriesModule,
    ConveyorsModule,
    DeliveryDetailsModule,
    StatusModule,
    BillingModule,
  ],
  providers: [SeedStatusService,SeedConveryorService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedStatusService: SeedStatusService, private readonly seedConveryorService: SeedConveryorService) {}

  async onModuleInit() {
    await this.seedStatusService.seedStatuses();
    await this.seedConveryorService.seedConveyors();

  }
}
