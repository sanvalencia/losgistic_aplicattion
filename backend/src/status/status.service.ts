import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {

  constructor(@InjectRepository(Status)private statusRepository: Repository<Status>,) {}


  async findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }

}
