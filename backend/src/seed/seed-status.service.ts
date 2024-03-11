import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class SeedStatusService {
    constructor(@InjectRepository(Status)private statusRepository: Repository<Status>,) {}

  async seedStatuses(): Promise<void> {

    const count = await this.statusRepository.count();
    if (count > 0) {
      return; 
    }

    const statuses = [
        { status_name: 'Entregado Transportista', alias:'ET', description: 'El envio ha sido entregado a la transportista' },
        { status_name: 'En Bodega', alias:'BT', description: 'El envio se encuentra en la bodega de la transportista' },
        { status_name: 'En camino', alias:'EC', description: 'El envio se encuentra en camino' },
        { status_name: 'En destino', alias:'CD', description: 'El envio se encuentra en la ciudad de destino' },
        { status_name: 'Entregado Cliente', alias:'EC', description: 'El envio ha sido entregado' },
      ];

    await this.statusRepository.save(statuses);
  }
}
