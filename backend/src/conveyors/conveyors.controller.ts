import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { CreateConveyorDto } from './dto/create-conveyor.dto';
import { UpdateConveyorDto } from './dto/update-conveyor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Conveyors')
@Controller('conveyors')
export class ConveyorsController {
  constructor(private readonly conveyorsService: ConveyorsService) {}

  @Post()
  async create(@Body() createConveyorDto: CreateConveyorDto) {
    return this.conveyorsService.create(createConveyorDto);
  }

  @Get()
  async findAll() {
    return this.conveyorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.conveyorsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateConveyorDto: UpdateConveyorDto) {
    return this.conveyorsService.update(id, updateConveyorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.conveyorsService.remove(id);
  }
}
