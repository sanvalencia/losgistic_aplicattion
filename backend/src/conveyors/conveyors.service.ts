import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConveyorDto } from './dto/create-conveyor.dto';
import { UpdateConveyorDto } from './dto/update-conveyor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conveyor } from './entities/conveyor.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ConveyorsService {

  constructor(@InjectRepository(Conveyor)private conveyorsRepository: Repository<Conveyor>,) {}

  async create(createConveyorDto: CreateConveyorDto): Promise<Conveyor> {
    const newConveyor = this.conveyorsRepository.create(createConveyorDto);
    return this.conveyorsRepository.save(newConveyor);
  }

  async findAll(): Promise<Conveyor[]> {
    return this.conveyorsRepository.find();
  }

  async findOne(id: number): Promise<Conveyor> {
    const conveyor = await this.conveyorsRepository.findOne({where: { id: id },} as FindOneOptions<Conveyor>);
    if (!conveyor) {
      throw new NotFoundException(`Conveyor with ID ${id} not found`);
    }
    return conveyor;
  }

  async update(id: number,updateConveyorDto: UpdateConveyorDto,): Promise<Conveyor> {
    const conveyor = await this.conveyorsRepository.findOne({where: { id: id },} as FindOneOptions<Conveyor>);
    if (!conveyor) {
      throw new NotFoundException(`Conveyor with ID ${id} not found`);
    }
    const updatedConveyor = Object.assign(conveyor, updateConveyorDto); 
    return this.conveyorsRepository.save(updatedConveyor);
  }

  async remove(id: number): Promise<void> {
    const conveyor = await this.conveyorsRepository.findOne({where: { id: id },} as FindOneOptions<Conveyor>); 
    if (!conveyor) {
      throw new NotFoundException(`Conveyor with ID ${id} not found`);
    }
    await this.conveyorsRepository.remove(conveyor);
  }
}
