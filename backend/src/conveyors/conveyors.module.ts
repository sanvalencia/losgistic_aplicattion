import { Module } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { ConveyorsController } from './conveyors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conveyor } from './entities/conveyor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conveyor])],
  controllers: [ConveyorsController],
  providers: [ConveyorsService],
  exports:[TypeOrmModule]
})

export class ConveyorsModule {}
