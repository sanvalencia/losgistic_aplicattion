import { PartialType } from '@nestjs/swagger';
import { CreateConveyorDto } from './create-conveyor.dto';

export class UpdateConveyorDto extends PartialType(CreateConveyorDto) {}
