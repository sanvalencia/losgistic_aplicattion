import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conveyor } from '../conveyors/entities/conveyor.entity';

@Injectable()
export class SeedConveryorService {
    constructor(@InjectRepository(Conveyor)private conveyorRepository: Repository<Conveyor>,) {}

  async seedConveyors(): Promise<void> {

    const count = await this.conveyorRepository.count();
    if (count > 0) {
      return; 
    }

    const conveyors = [
        { bussines_name: 'Coordinadora', phone: '3117831850', email: 'Coordinadora@gmail.com' },
        { bussines_name: 'Servientrega', phone: '3122241327', email: 'Servientrega@gmail.com' },
      ];

    await this.conveyorRepository.save(conveyors);
  }
}
