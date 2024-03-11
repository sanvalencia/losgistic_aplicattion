import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async findAll() {
    return this.statusService.findAll();
  }

}
