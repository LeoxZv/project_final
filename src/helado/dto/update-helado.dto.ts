import { PartialType } from '@nestjs/mapped-types';
import { CreateHeladoDto } from './create-helado.dto';

export class UpdateHeladoDto extends PartialType(CreateHeladoDto) {}
